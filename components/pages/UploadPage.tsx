import { useState, useRef } from 'react';
import { Upload, CheckCircle2, XCircle, AlertCircle, Shield, FileImage, X, Download, FileJson, FileText, Scan, Activity, FileDigit, Microscope, Cpu, Layers } from 'lucide-react';

interface AnalysisResult {
  overall: 'authentic' | 'fabricated' | 'suspicious';
  confidence: number;
  detectors: {
    name: string;
    icon: any;
    result: 'clean' | 'detected' | 'suspicious';
    confidence: number;
    details: string;
  }[];
  metadata: {
    fileName: string;
    fileSize: string;
    dimensions: string;
    format: string;
    uploadDate: string;
    md5Hash: string;
    colorSpace: string;
    bitDepth: string;
  };
}

export function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setResult(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setResult(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const generateMockAnalysis = (file: File): AnalysisResult => {
    // Logic tailored for Receipt/Document Verification based on literature (ELA, CNN, Metadata)
    const detectionProbability = Math.random();
    const overall: 'authentic' | 'fabricated' | 'suspicious' = 
      detectionProbability < 0.6 ? 'authentic' : 
      detectionProbability < 0.8 ? 'suspicious' : 'fabricated';
    
    const detectors = [
      {
        name: 'CNN Pattern Recognition',
        icon: Cpu,
        result: detectionProbability > 0.75 ? 'detected' : detectionProbability > 0.5 ? 'suspicious' : 'clean',
        confidence: Math.floor(70 + Math.random() * 30),
        details: detectionProbability > 0.75 ? 'Synthetic generation artifacts detected by CNN model' : detectionProbability > 0.5 ? 'Minor irregularities in noise distribution' : 'Natural noise patterns consistent with optical sensors'
      },
      {
        name: 'ELA (Error Level Analysis)',
        icon: Layers,
        result: detectionProbability > 0.7 ? 'suspicious' : 'clean',
        confidence: Math.floor(65 + Math.random() * 35),
        details: detectionProbability > 0.7 ? 'Inconsistent JPEG compression blocks found (Zou et al. 2025)' : 'Uniform compression levels detected across document'
      },
      {
        name: 'Metadata Forensics',
        icon: FileDigit,
        result: detectionProbability > 0.8 ? 'detected' : 'clean',
        confidence: Math.floor(75 + Math.random() * 25),
        details: detectionProbability > 0.8 ? 'Missing camera/lens signature (Xu & Zhao 2020)' : 'EXIF data consistent with device signature'
      },
      {
        name: 'Typography & Layout',
        icon: Scan,
        result: detectionProbability > 0.85 ? 'detected' : detectionProbability > 0.6 ? 'suspicious' : 'clean',
        confidence: Math.floor(60 + Math.random() * 40),
        details: detectionProbability > 0.85 ? 'Font aliasing inconsistencies detected' : detectionProbability > 0.6 ? 'Unusual spacing/kerning for standard receipt' : 'Text geometry aligns with standard printing'
      },
      {
        name: 'Visual Artifact Scan',
        icon: Microscope,
        result: detectionProbability > 0.65 ? 'suspicious' : 'clean',
        confidence: Math.floor(70 + Math.random() * 30),
        details: detectionProbability > 0.65 ? 'High-frequency noise anomalies found' : 'No diffusion model fingerprints detected'
      },
    ];

    // Get image dimensions from the preview
    const img = new Image();
    img.src = preview!;
    
    return {
      overall,
      confidence: Math.floor(65 + Math.random() * 35),
      detectors: detectors as any,
      metadata: {
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(2)} KB`,
        dimensions: `${img.naturalWidth} x ${img.naturalHeight}`,
        format: file.type.split('/')[1].toUpperCase(),
        uploadDate: new Date().toISOString().split('T')[0],
        md5Hash: '7f9a2b8c...', // Placeholder
        colorSpace: 'sRGB', 
        bitDepth: '8-bit' 
      }
    };
  };

  // DJANGO INTEGRATION NOTE:
  // This is where you would connect to your Django backend.
  // Instead of calling generateMockAnalysis, you would create a FormData object
  // and send it to your API endpoint.
  //
  // Your Django view should accept the image, run the CNN model + ELA + Metadata extraction,
  // and return a JSON response matching the structure above.
  /*
  const uploadImageToDjango = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      // Replace with your actual Django endpoint
      const response = await fetch('http://localhost:8000/api/analyze-receipt/', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Analysis failed');
      
      const data = await response.json();
      return data; // Ensure this matches AnalysisResult interface
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  */

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setAnalyzing(true);
    
    // Simulate analysis time - In a real app, await the uploadImageToDjango(selectedFile) here
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const mockResult = generateMockAnalysis(selectedFile);
    setResult(mockResult);
    setAnalyzing(false);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getOverallColor = (overall: string) => {
    switch (overall) {
      case 'authentic': return 'text-green-500';
      case 'suspicious': return 'text-yellow-500';
      case 'fabricated': return 'text-red-600';
      default: return 'text-gray-500';
    }
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'clean': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'suspicious': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'detected': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const downloadJSON = () => {
    if (!result) return;
    const reportData = { report: result };
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vault-receipt-verification-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    if (!result) return;
    // Simple text report
    const pdfContent = `VAULT DOCUMENT VERIFICATION REPORT\nDATE: ${new Date().toISOString()}\nRESULT: ${result.overall.toUpperCase()}\nCONFIDENCE: ${result.confidence}%\n\nDETAILED ANALYSIS:\n${result.detectors.map(d => `- ${d.name}: ${d.result.toUpperCase()} (${d.details})`).join('\n')}`;
    const dataBlob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vault-report-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
       {/* Background Grid Pattern */}
       <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(220, 38, 38, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.2) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-red-600" />
            <h1 className="text-4xl text-white tracking-widest font-light uppercase">Document Verification</h1>
          </div>
          <p className="text-gray-500 max-w-2xl mx-auto tracking-wide text-sm">
            Upload receipt or invoice for forensic analysis (CNN + ELA + Metadata).
          </p>
        </div>

        {/* Upload Area */}
        {!preview ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="group relative border border-zinc-800 bg-zinc-900/30 rounded-none p-16 text-center transition-all duration-300 hover:bg-zinc-900/50 cursor-pointer overflow-hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600/50 group-hover:border-red-600 transition-colors"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-600/50 group-hover:border-red-600 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-600/50 group-hover:border-red-600 transition-colors"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-600/50 group-hover:border-red-600 transition-colors"></div>
            
            {/* Animated Scanner Bar (Ghost) */}
            <div className="absolute inset-x-0 top-0 h-1 bg-red-600/20 shadow-[0_0_15px_rgba(220,38,38,0.5)] transform translate-y-[-100%] group-hover:animate-[scan_2s_linear_infinite]"></div>

            <Scan className="w-20 h-20 text-red-900/50 group-hover:text-red-600 mx-auto mb-6 transition-colors duration-500" />
            
            <h3 className="text-2xl text-white mb-2 uppercase tracking-widest font-light">Initiate Scan</h3>
            <p className="text-gray-500 mb-6 uppercase text-xs tracking-wider">Drop receipt image or click to browse</p>
            
            <div className="inline-flex items-center gap-4 text-[10px] text-zinc-600 uppercase tracking-widest">
                <span>JPG</span>
                <span>PNG</span>
                <span>WEBP</span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Preview */}
            <div className="bg-zinc-900/30 border border-zinc-800 p-6 relative">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-red-600/30"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-600/30"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-600/30"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-red-600/30"></div>

              <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
                <h3 className="text-sm text-white flex items-center gap-2 uppercase tracking-widest">
                  <FileImage className="w-4 h-4 text-red-600" />
                  Source Document
                </h3>
                <button
                  onClick={handleClear}
                  className="p-1 hover:text-red-600 transition-colors text-gray-500"
                  aria-label="Clear"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="relative overflow-hidden border border-zinc-800 bg-black mb-6 group">
                {/* Grid Overlay for "Scanning" look */}
                <div className="absolute inset-0 pointer-events-none opacity-20" 
                     style={{backgroundImage: 'linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
                </div>
                
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full opacity-80"
                />
                
                {analyzing && (
                    <div className="absolute inset-0 bg-red-900/10 z-10">
                        <div className="absolute inset-x-0 h-1 bg-red-600 shadow-[0_0_20px_rgba(220,38,38,1)] animate-[scan_1.5s_linear_infinite]"></div>
                        <div className="absolute top-2 right-2 font-mono text-xs text-red-600 animate-pulse">ANALYZING TEXTURE...</div>
                    </div>
                )}
              </div>

              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white py-4 transition-colors uppercase tracking-widest text-sm font-medium flex items-center justify-center gap-2 relative overflow-hidden"
              >
                {analyzing ? (
                    <>
                        <Activity className="w-4 h-4 animate-spin" />
                        Running Diagnostics...
                    </>
                ) : 'Execute Analysis'}
              </button>
            </div>

            {/* Analysis Results */}
            <div className="bg-zinc-900/30 border border-zinc-800 p-6 relative flex flex-col min-h-[500px]">
               {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-red-600/30"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-600/30"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-600/30"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-red-600/30"></div>

              {!result && !analyzing && (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-600 opacity-50">
                  <Shield className="w-16 h-16 mb-4 stroke-1" />
                  <p className="uppercase tracking-widest text-xs">System Idle</p>
                  <p className="text-[10px] mt-2">Waiting for receipt image</p>
                </div>
              )}

              {analyzing && (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-4 border-red-900 border-t-red-600 rounded-full animate-spin mb-6"></div>
                  <p className="text-white uppercase tracking-widest text-sm animate-pulse">Processing Data</p>
                  <div className="w-48 h-1 bg-zinc-800 mt-6 overflow-hidden">
                      <div className="h-full bg-red-600 animate-[loading_2s_ease-in-out_infinite]"></div>
                  </div>
                  <div className="mt-4 space-y-1 text-center">
                      <p className="text-[10px] text-red-600 font-mono">Comparing against standard layouts...</p>
                      <p className="text-[10px] text-red-600 font-mono">Analyzing compression artifacts...</p>
                      <p className="text-[10px] text-red-600 font-mono">Verifying EXIF data...</p>
                  </div>
                </div>
              )}

              {result && !analyzing && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  {/* Overall Result Header */}
                  <div className={`border-l-4 p-4 bg-black/50 ${
                      result.overall === 'authentic' ? 'border-green-500' :
                      result.overall === 'suspicious' ? 'border-yellow-500' : 'border-red-600'
                  }`}>
                    <h3 className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Final Verdict</h3>
                    <div className="flex items-center gap-3">
                      <span className={`text-3xl uppercase tracking-widest font-light ${getOverallColor(result.overall)}`}>
                        {result.overall}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-gray-500 text-xs uppercase">Confidence Level:</span>
                        <div className="flex-1 h-1 bg-zinc-800">
                            <div 
                                className={`h-full ${getOverallColor(result.overall).replace('text-', 'bg-')}`} 
                                style={{width: `${result.confidence}%`}}
                            ></div>
                        </div>
                        <span className="text-white text-xs font-mono">{result.confidence}%</span>
                    </div>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs border-y border-zinc-800 py-4">
                      <div className="text-gray-500 uppercase tracking-wider">Size</div>
                      <div className="text-white text-right font-mono">{result.metadata.fileSize}</div>
                      
                      <div className="text-gray-500 uppercase tracking-wider">Type</div>
                      <div className="text-white text-right font-mono">{result.metadata.format}</div>
                      
                      <div className="text-gray-500 uppercase tracking-wider">Resolution</div>
                      <div className="text-white text-right font-mono">{result.metadata.dimensions}</div>
                  </div>

                  {/* Detector Results List */}
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {result.detectors.map((detector, index) => (
                      <div key={index} className="flex flex-col p-3 hover:bg-zinc-800/50 transition-colors border border-zinc-800/50 bg-black/20 mb-2 last:mb-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                                <detector.icon className="w-3 h-3 text-red-600" />
                                <span className="text-gray-300 text-xs font-medium">{detector.name}</span>
                            </div>
                            <span className={`text-[10px] font-mono ${
                                detector.result === 'clean' ? 'text-green-500' : 
                                detector.result === 'suspicious' ? 'text-yellow-500' : 'text-red-500'
                            }`}>
                                {detector.result.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-500 ml-5">{detector.details}</p>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={downloadJSON}
                      className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-3 text-xs uppercase tracking-wider transition-colors"
                    >
                      <FileJson className="w-4 h-4" />
                      Export JSON
                    </button>
                    <button
                      onClick={downloadPDF}
                      className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-3 text-xs uppercase tracking-wider transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}