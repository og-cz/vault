"""
backend/python-workers/analyze-image.py
=========================================
Combined ML + Forensics worker.
This is what Node.js actually spawns from server.js.

It delegates ML to ml_worker/inference.py
and forensics to df/analyzer.py.

Accepts newline-delimited JSON on stdin, writes results to stdout.
Each request/response is a single JSON line.

Request:
    {"id": "uuid", "image_path": "/absolute/path/to/upload.jpg"}

Response:
    {
      "id": "uuid",
      "error": null,

      // ML result
      "prediction"  : "Real" | "AI/Fake",
      "confidence"  : 0.97,
      "real_prob"   : 0.97,
      "fake_prob"   : 0.03,
      "flag_review" : false,
      "model_votes" : {"resnet34": "Real", "efficientnet_b0": "Real", "mobilenet_v2": "Real"},

      // Forensics
      "ela"             : {"mean": 4.2, "max": 38.0, "std": 3.1, "suspicious": false},
      "metadata"        : {"has_exif": true, "software": null, "suspicious": false, ...},
      "noise"           : {"variance": 120.4, "mean_abs": 8.3, "suspicious": false},
      "forensic_flags"  : 0,
      "forensic_verdict": "Clean"
    }
"""

import sys
import os
import json
import traceback

# ── Fix sys.path so imports work from any working directory ──────────
_THIS_DIR = os.path.dirname(os.path.abspath(__file__))
_BACKEND  = os.path.dirname(_THIS_DIR)          # backend/
_PROJECT  = os.path.dirname(_BACKEND)           # project root

for _p in [_BACKEND, _PROJECT]:
    if _p not in sys.path:
        sys.path.insert(0, _p)

# ── ML inference ─────────────────────────────────────────────────────
try:
    from ml.inference import load_models, predict as ml_predict
    _ML_AVAILABLE = True
    _ML_ERROR     = None
except Exception as e:
    _ML_AVAILABLE = False
    _ML_ERROR     = traceback.format_exc()

# ── Digital forensics ────────────────────────────────────────────────
try:
    from df.analyzer import run_forensics
    _FORENSICS_AVAILABLE = True
    _FORENSICS_ERROR     = None
except Exception as e:
    _FORENSICS_AVAILABLE = False
    _FORENSICS_ERROR     = str(e)


# STARTUP

def startup():
    if not _ML_AVAILABLE:
        _write({
            "status" : "error",
            "message": f"ML module failed to load: {_ML_ERROR}"
        })
        sys.exit(1)

    try:
        cnn_models, xgb_models = load_models()
        _write({
            "status"             : "ready",
            "ml"                 : True,
            "forensics"          : _FORENSICS_AVAILABLE,
            "forensics_note"     : _FORENSICS_ERROR if not _FORENSICS_AVAILABLE else None,
        })
        return cnn_models, xgb_models
    except Exception as exc:
        _write({
            "status" : "error",
            "message": str(exc),
            "trace"  : traceback.format_exc(),
        })
        sys.exit(1)


# ─────────────────────────────────────────────────────────────────────
# REQUEST HANDLER
# ─────────────────────────────────────────────────────────────────────

def handle(line, cnn_models, xgb_models):
    req_id = None
    try:
        req      = json.loads(line)
        req_id   = req.get("id", "no-id")
        img_path = req.get("image_path", "")

        if not img_path:
            raise ValueError("Missing field: image_path")
        if not os.path.isfile(img_path):
            raise FileNotFoundError(f"Image not found: {img_path}")

        # ── ML prediction ────────────────────────────────────────────
        ml_result = ml_predict(img_path, cnn_models, xgb_models)

        # ── Forensics ────────────────────────────────────────────────
        if _FORENSICS_AVAILABLE:
            try:
                forensics = run_forensics(img_path)
            except Exception as fe:
                forensics = _empty_forensics(str(fe))
        else:
            forensics = _empty_forensics(
                f"Forensics module unavailable — {_FORENSICS_ERROR}"
            )

        _write({
            "id"   : req_id,
            "error": None,
            **ml_result,
            **forensics,
        })

    except json.JSONDecodeError as je:
        _write({
            "id"   : req_id,
            "error": f"Bad JSON input: {je}",
        })
    except Exception as exc:
        _write({
            "id"   : req_id,
            "error": f"{type(exc).__name__}: {exc}",
            "trace": traceback.format_exc(),
        })


def _empty_forensics(reason="unavailable"):
    return {
        "ela"             : {"mean": None, "max": None, "std": None,
                             "suspicious": None, "error": reason},
        "metadata"        : {"has_exif": None, "suspicious": None, "error": reason},
        "noise"           : {"variance": None, "mean_abs": None,
                             "suspicious": None, "error": reason},
        "forensic_flags"  : 0,
        "forensic_verdict": "Unavailable",
    }

def _write(obj):
    sys.stdout.write(json.dumps(obj) + "\n")
    sys.stdout.flush()

if __name__ == "__main__":
    cnn_models, xgb_models = startup()

    for line in sys.stdin:
        line = line.strip()
        if line:
            handle(line, cnn_models, xgb_models)
