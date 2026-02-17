/**
 * backend/server.js
 * ==================
 * Express server — port 8000 (matching your existing setup).
 * Spawns ONE Python worker process at startup and routes all
 * image-analysis requests through it via stdin/stdout JSON.
 *
 * Endpoints:
 *   GET  /api/health         → { status, mlReady, forensicsAvailable }
 *   POST /api/analyze        → multipart/form-data  field: "image"
 *   POST /api/predict        → alias for /api/analyze (backwards compat)
 */

const express  = require("express");
const multer   = require("multer");
const cors     = require("cors");
const path     = require("path");
const fs       = require("fs");
const { v4: uuid } = require("uuid");
const { spawn }    = require("child_process");

const app  = express();
const PORT = process.env.PORT || 8000;

// ── Upload temp directory ────────────────────────────────────────────
const UPLOAD_DIR = path.join(__dirname, "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// ── Multer — preserve file extension so PIL can identify it ─────────
const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    cb(null, `upload-${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },   // 10 MB
  fileFilter: (_, file, cb) => {
    const ok = /^image\/(jpeg|jpg|png|webp|bmp)$/.test(file.mimetype);
    cb(ok ? null : new Error("Only image files are accepted"), ok);
  },
});

// ── CORS — allow Vite dev server ─────────────────────────────────────
app.use(cors({
  origin: [
    "http://localhost:5173",   // Vite default
    "http://127.0.0.1:5173",   // Direct IP
    "http://localhost:3000",   // fallback
    "http://127.0.0.1:3000",   // fallback IP
    process.env.FRONTEND_URL, // production
  ].filter(Boolean),
}));
app.use(express.json());

// ════════════════════════════════════════════════════════════════════
// PYTHON WORKER BRIDGE
// ════════════════════════════════════════════════════════════════════

class PythonWorker {
  constructor() {
    this.proc             = null;
    this.ready            = false;
    this.forensicsReady   = false;
    this.pending          = new Map();   // id → { resolve, reject, timer }
    this.buffer           = "";
    this.TIMEOUT_MS       = 90_000;     // 90 s — first request is slow (model load)
  }

  /**
   * Spawn the Python process and wait until it sends {"status":"ready"}.
   * Resolves when ready, rejects on error or timeout.
   */
  start() {
    return new Promise((resolve, reject) => {
      // ── Find Python executable ──────────────────────────────────
      const pythonBin = this._findPython();

      // ── Worker script path ──────────────────────────────────────
      const workerScript = path.join(
        __dirname, "python-workers", "analyze_image.py"
      );

      if (!fs.existsSync(workerScript)) {
        return reject(new Error(`Worker script not found: ${workerScript}`));
      }

      // ── Environment ─────────────────────────────────────────────
      const env = {
        ...process.env,
        MAD_MODEL_DIR: path.join(__dirname, "ml", "models"),
        PYTHONUNBUFFERED: "1",      // critical — ensures stdout is not buffered
      };

      console.log(`[ML] Spawning Python worker: ${pythonBin} ${workerScript}`);
      console.log(`[ML] Model dir: ${env.MAD_MODEL_DIR}`);

      this.proc = spawn(pythonBin, [workerScript], { env });

      // ── stdout handler ──────────────────────────────────────────
      this.proc.stdout.setEncoding("utf8");
      this.proc.stdout.on("data", (chunk) => this._onData(chunk));

      // ── stderr — log Python errors/warnings ────────────────────
      this.proc.stderr.setEncoding("utf8");
      this.proc.stderr.on("data", (d) => {
        console.error("[PY stderr]", d.trim());
      });

      // ── Process exit ────────────────────────────────────────────
      this.proc.on("exit", (code, signal) => {
        this.ready = false;
        console.error(`[ML] Worker exited — code: ${code}  signal: ${signal}`);
        // Reject all pending requests
        for (const [id, { reject: rej, timer }] of this.pending) {
          clearTimeout(timer);
          rej(new Error("Python worker process exited unexpectedly"));
        }
        this.pending.clear();
      });

      // ── Wait for first {"status":"ready"} line ──────────────────
      const readyTimeout = setTimeout(() => {
        reject(new Error("Python worker startup timed out (60 s)"));
      }, 60_000);

      const readyHandler = (chunk) => {
        const lines = (this.buffer + chunk).split("\n");
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const msg = JSON.parse(line);
            if (msg.status === "ready") {
              clearTimeout(readyTimeout);
              this.ready          = true;
              this.forensicsReady = msg.forensics === true;
              this.proc.stdout.removeListener("data", readyHandler);
              console.log(
                `[ML] Worker ready — forensics: ${this.forensicsReady}`
              );
              resolve();
              return;
            } else if (msg.status === "error") {
              clearTimeout(readyTimeout);
              reject(new Error(`Worker startup error: ${msg.message}`));
              return;
            }
          } catch (_) {}
        }
        this.buffer += chunk;
      };

      this.proc.stdout.once("data", readyHandler);
    });
  }

  /** Send one image path to the worker; returns a Promise of the result. */
  analyze(imagePath) {
    if (!this.ready) {
      return Promise.reject(new Error("ML worker is not ready"));
    }

    return new Promise((resolve, reject) => {
      const id    = uuid();
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error("ML worker request timed out"));
      }, this.TIMEOUT_MS);

      this.pending.set(id, { resolve, reject, timer });
      this.proc.stdin.write(JSON.stringify({ id, image_path: imagePath }) + "\n");
    });
  }

  /** Parse stdout lines and resolve/reject matching pending requests. */
  _onData(chunk) {
    this.buffer += chunk;
    const lines  = this.buffer.split("\n");
    this.buffer  = lines.pop();   // keep the incomplete last line

    for (const line of lines) {
      if (!line.trim()) continue;
      let msg;
      try {
        msg = JSON.parse(line);
      } catch {
        console.error("[ML] Unparseable stdout line:", line.slice(0, 200));
        continue;
      }

      const pending = this.pending.get(msg.id);
      if (!pending) continue;

      clearTimeout(pending.timer);
      this.pending.delete(msg.id);

      if (msg.error) {
        pending.reject(new Error(msg.error));
      } else {
        pending.resolve(msg);
      }
    }
  }

  /** Find the correct Python binary (venv first, then system). */
  _findPython() {
    const candidates = [
      // .venv in project root
      path.join(__dirname, "..", ".venv", "Scripts", "python.exe"),   // Windows
      path.join(__dirname, "..", ".venv", "bin",     "python3"),       // Unix
      path.join(__dirname, "..", ".venv", "bin",     "python"),
      // venv inside backend/
      path.join(__dirname, ".venv", "Scripts", "python.exe"),
      path.join(__dirname, ".venv", "bin",     "python3"),
      // system Python
      "python3",
      "python",
    ];

    for (const p of candidates) {
      if (p.includes(path.sep) && fs.existsSync(p)) return p;
    }
    // fallback to system python — will error if not found
    return "python3";
  }
}

// ── Singleton ────────────────────────────────────────────────────────
const worker = new PythonWorker();

// ════════════════════════════════════════════════════════════════════
// ROUTES
// ════════════════════════════════════════════════════════════════════

// Health check
app.get("/api/health", (_, res) => {
  res.json({
    status            : "ok",
    mlReady           : worker.ready,
    forensicsAvailable: worker.forensicsReady,
  });
});

// Main analysis endpoint
async function handleAnalyze(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided" });
  }

  const tmpPath = req.file.path;

  try {
    const mlResult = await worker.analyze(tmpPath);
    const transformedResult = transformPythonResponse(mlResult, req.file);
    res.json(transformedResult);
  } catch (err) {
    console.error("[/api/analyze]", err.message);
    res.status(500).json({ error: err.message });
  } finally {
    // Always delete the temp upload file
    fs.unlink(tmpPath, (unlinkErr) => {
      if (unlinkErr) console.warn("[cleanup]", unlinkErr.message);
    });
  }
}

/**
 * Transform Python worker response to frontend-compatible format
 */
function transformPythonResponse(pythonResult, file) {
  // Map ML prediction to verdict
  const prediction = pythonResult.prediction || "Suspicious";
  let verdict = "Suspicious";
  let verdictColor = "yellow";
  
  if (prediction === "Real") {
    verdict = "Authentic";
    verdictColor = "green";
  } else if (prediction === "AI/Fake") {
    verdict = "AI-Generated";
    verdictColor = "red";
  }

  // Convert confidence from 0-1 to 0-100 percentage
  const confidence = Math.round((pythonResult.confidence || 0) * 100);

  // Build test results from forensic analysis
  const tests = {
    cnn_pattern_recognition: {
      status: pythonResult.flag_review ? "WARNING" : "CLEAN",
      message: `CNN Prediction: ${pythonResult.prediction} (${(pythonResult.confidence * 100).toFixed(1)}% confidence)`,
      technical: `Real prob: ${pythonResult.real_prob}, Fake prob: ${pythonResult.fake_prob}`,
    },
    ela_error_level_analysis: {
      status: pythonResult.ela?.suspicious ? "SUSPICIOUS" : "CLEAN",
      message: pythonResult.ela?.error || `ELA Mean: ${pythonResult.ela?.mean?.toFixed(2)}, Std: ${pythonResult.ela?.std?.toFixed(2)}`,
      technical: `Max deviation: ${pythonResult.ela?.max?.toFixed(2)}`,
    },
    metadata_forensics: {
      status: pythonResult.metadata?.suspicious ? "SUSPICIOUS" : "CLEAN",
      message: pythonResult.metadata?.error || (pythonResult.metadata?.has_exif ? "EXIF data present" : "No EXIF data found"),
      technical: pythonResult.metadata?.software ? `Software: ${pythonResult.metadata.software}` : "Standard metadata check",
    },
    noise_pattern_analysis: {
      status: pythonResult.noise?.suspicious ? "SUSPICIOUS" : "CLEAN",
      message: pythonResult.noise?.error || `Noise variance: ${pythonResult.noise?.variance?.toFixed(2)}`,
      technical: `Mean absolute deviation: ${pythonResult.noise?.mean_abs?.toFixed(2)}`,
    },
    visual_artifact_scan: {
      status: pythonResult.forensic_verdict === "Highly suspicious" ? "SUSPICIOUS" : pythonResult.forensic_verdict === "Suspicious" ? "WARNING" : "CLEAN",
      message: `Forensic verdict: ${pythonResult.forensic_verdict}`,
      technical: `Suspicious flags: ${pythonResult.forensic_flags}/3`,
    },
  };

  return {
    status: "success",
    verdict,
    confidence,
    verdictColor,
    fileInfo: {
      name: file.originalname,
      size: file.size,
      sizeReadable: `${(file.size / 1024).toFixed(2)} KB`,
      type: file.mimetype,
      resolution: "Extracted",
    },
    tests,
    summary: {
      total_tests: 5,
      suspicious_flags: pythonResult.forensic_flags || 0,
      warning_flags: pythonResult.flag_review ? 1 : 0,
      clean_flags: (5 - (pythonResult.forensic_flags || 0) - (pythonResult.flag_review ? 1 : 0)),
    },
    mlAnalysis: {
      prediction: pythonResult.prediction,
      confidence: pythonResult.confidence,
      models_used: Object.keys(pythonResult.model_votes || {}),
      features_extracted: 0,
    },
    timestamp: new Date().toISOString(),
    error: pythonResult.error || null,
  };
}

app.post("/api/analyze", upload.single("image"), handleAnalyze);
app.post("/api/predict", upload.single("image"), handleAnalyze);   // alias

// 404 fallback
app.use((_, res) => res.status(404).json({ error: "Route not found" }));

// ════════════════════════════════════════════════════════════════════
// START
// ════════════════════════════════════════════════════════════════════

worker
  .start()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[Server] http://localhost:${PORT}`);
      console.log(`[Server] POST /api/analyze  — send multipart/form-data field "image"`);
    });
  })
  .catch((err) => {
    console.error("[Server] Failed to start ML worker:", err.message);
    console.error("\nCommon fixes:");
    console.error("  1. Run: pip install torch torchvision xgboost scikit-learn pillow scipy");
    console.error("  2. Copy .pth and .pkl files into backend/ml/models/");
    console.error("  3. Check Python version: python3 --version (need 3.9+)");
    process.exit(1);
  });
