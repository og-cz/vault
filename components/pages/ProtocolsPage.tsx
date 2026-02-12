import { Shield, Eye, Cpu, Network, ScanLine, FileSearch, Database, Activity, CheckCircle2, Palette, Type, Grid, Layers } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../ThemeContext';

export function ProtocolsPage() {
  const [activeTab, setActiveTab] = useState<'cnn' | 'ela' | 'meta'>('cnn');
  const { isPublic } = useTheme();

  const themeColors = {
    bg: isPublic ? 'bg-slate-50' : 'bg-black',
    textPrimary: isPublic ? 'text-slate-900' : 'text-white',
    textSecondary: isPublic ? 'text-slate-500' : 'text-gray-400',
    accent: isPublic ? 'text-blue-600' : 'text-red-600',
    accentBorder: isPublic ? 'border-blue-200' : 'border-red-900/30',
    accentBg: isPublic ? 'bg-blue-50' : 'bg-red-950',
    cardBg: isPublic ? 'bg-white' : 'bg-black',
    cardBorder: isPublic ? 'border-slate-200' : 'border-zinc-800',
    sidebarBg: isPublic ? 'bg-white/80' : 'bg-zinc-900/30',
    sidebarHover: isPublic ? 'hover:bg-slate-100' : 'hover:bg-zinc-800',
    sidebarActive: isPublic ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-red-900/20 border-red-600 text-white',
    codeBlockBg: isPublic ? 'bg-slate-900' : 'bg-zinc-950', // Keep code dark
    subCardBg: isPublic ? 'bg-slate-100' : 'bg-zinc-900/30',
    iconBg: isPublic ? 'bg-blue-50 border-blue-200' : 'bg-red-900/20 border-red-600',
  };

  const gridColor = isPublic ? 'rgba(37, 99, 235, 0.1)' : 'rgba(220, 38, 38, 0.1)';

  return (
    <div className={`${themeColors.bg} min-h-screen pb-20 relative overflow-hidden transition-colors duration-500`}>
      {/* Background Grid - Slowed */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0" 
          style={{
             backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
             backgroundSize: '100px 100px',
             animation: 'pan 120s linear infinite'
          }}
        ></div>
        <style>{`
          @keyframes pan {
            0% { background-position: 0 0; }
            100% { background-position: 1000px 1000px; }
          }
        `}</style>
      </div>

      {/* Header Section */}
      <section className={`relative pt-12 pb-16 border-b ${themeColors.accentBorder} transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <h1 className={`text-5xl md:text-7xl ${themeColors.textPrimary} mb-6 font-normal tracking-wide transition-colors`}>
            Defense Protocols
          </h1>
          
          <p className={`${themeColors.textSecondary} max-w-2xl mx-auto text-sm tracking-wide font-light transition-colors`}>
            Technical specifications of the MAD (Multimedia Artificial Detection) architecture.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12 mb-24">
          
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className={`sticky top-24 ${themeColors.sidebarBg} border ${themeColors.cardBorder} backdrop-blur-sm p-2 transition-colors`}>
              <div className={`text-[10px] ${isPublic ? 'text-slate-400' : 'text-zinc-500'} font-mono uppercase tracking-widest mb-4 px-4 pt-2`}>Select Module</div>
              
              <button 
                onClick={() => setActiveTab('cnn')}
                className={`w-full text-left px-4 py-4 flex items-center gap-3 transition-all border-l-2 ${activeTab === 'cnn' ? themeColors.sidebarActive : `border-transparent ${themeColors.textSecondary} hover:${isPublic ? 'text-blue-600' : 'text-white'} ${themeColors.sidebarHover}`}`}
              >
                <Cpu className={`w-5 h-5 ${activeTab === 'cnn' ? (isPublic ? 'text-blue-600' : 'text-red-600') : (isPublic ? 'text-slate-400' : 'text-zinc-600')}`} />
                <div>
                  <div className="text-sm uppercase tracking-wider font-medium">Neural Net</div>
                  <div className="text-[10px] font-mono opacity-60">Deep Learning Model</div>
                </div>
              </button>

              <button 
                onClick={() => setActiveTab('ela')}
                className={`w-full text-left px-4 py-4 flex items-center gap-3 transition-all border-l-2 ${activeTab === 'ela' ? themeColors.sidebarActive : `border-transparent ${themeColors.textSecondary} hover:${isPublic ? 'text-blue-600' : 'text-white'} ${themeColors.sidebarHover}`}`}
              >
                <ScanLine className={`w-5 h-5 ${activeTab === 'ela' ? (isPublic ? 'text-blue-600' : 'text-red-600') : (isPublic ? 'text-slate-400' : 'text-zinc-600')}`} />
                <div>
                  <div className="text-sm uppercase tracking-wider font-medium">E.L.A.</div>
                  <div className="text-[10px] font-mono opacity-60">Error Level Analysis</div>
                </div>
              </button>

              <button 
                onClick={() => setActiveTab('meta')}
                className={`w-full text-left px-4 py-4 flex items-center gap-3 transition-all border-l-2 ${activeTab === 'meta' ? themeColors.sidebarActive : `border-transparent ${themeColors.textSecondary} hover:${isPublic ? 'text-blue-600' : 'text-white'} ${themeColors.sidebarHover}`}`}
              >
                <FileSearch className={`w-5 h-5 ${activeTab === 'meta' ? (isPublic ? 'text-blue-600' : 'text-red-600') : (isPublic ? 'text-slate-400' : 'text-zinc-600')}`} />
                <div>
                  <div className="text-sm uppercase tracking-wider font-medium">Metadata</div>
                  <div className="text-[10px] font-mono opacity-60">Forensic Extraction</div>
                </div>
              </button>
            </div>
          </div>

          {/* Content Panel */}
          <div className="lg:w-3/4">
            <div className={`${themeColors.cardBg} border ${themeColors.cardBorder} p-8 min-h-[600px] relative overflow-hidden transition-colors`}>
               {/* Decorative Background Elements */}
               <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Activity className={`w-24 h-24 ${isPublic ? 'text-blue-100' : 'text-red-900'}`} />
               </div>
               
               {activeTab === 'cnn' && (
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 ${themeColors.iconBg} rounded flex items-center justify-center transition-colors`}>
                        <Network className={`w-6 h-6 ${isPublic ? 'text-blue-500' : 'text-red-500'}`} />
                      </div>
                      <div>
                        <h2 className={`text-2xl ${themeColors.textPrimary} uppercase tracking-widest font-light`}>Convolutional Neural Networks</h2>
                        <div className={`${isPublic ? 'text-blue-500' : 'text-red-500'} font-mono text-xs mt-1`}>MODULE_ID: CNN-X99</div>
                      </div>
                    </div>

                    <div className="prose max-w-none mb-8">
                      <p className={`${themeColors.textSecondary} font-light leading-relaxed`}>
                        Our proprietary CNN architecture utilizes a customized ResNet-50 backbone, fine-tuned on a localized dataset of over 50 million authentic and synthetic receipts. The model is specifically engineered to identify microscopic noise patterns, checkerboard artifacts, and upsampling inconsistencies introduced by latent diffusion models (LDMs) like Stable Diffusion, Midjourney, and DALL-E 3. Unlike standard object detection, this network focuses on high-frequency residuals that remain invisible to the naked eye.
                      </p>
                    </div>

                    {/* Visual Code Block */}
                    <div className={`${themeColors.codeBlockBg} border ${isPublic ? 'border-slate-800' : 'border-zinc-800'} p-4 font-mono text-xs text-green-500 mb-8 rounded shadow-inner overflow-hidden relative`}>
                      <div className="absolute top-2 right-2 flex gap-1">
                        <div className={`w-2 h-2 rounded-full ${isPublic ? 'bg-blue-500' : 'bg-red-500'} animate-pulse`}></div>
                      </div>
                      <div className="opacity-70">
                        <p>{`> IMPORT TENSORFLOW AS TF`}</p>
                        <p>{`> FROM KERAS.LAYERS IMPORT CONV2D, BATCHNORMALIZATION, RELU`}</p>
                        <p>{`> `}</p>
                        <p>{`> DEF RESIDUAL_BLOCK(X, FILTERS):`}</p>
                        <p>{`>     SHORTCUT = X`}</p>
                        <p>{`>     X = CONV2D(FILTERS, (3, 3), PADDING='SAME')(X)`}</p>
                        <p>{`>     X = BATCHNORMALIZATION()(X)`}</p>
                        <p>{`>     X = RELU()(X)`}</p>
                        <p>{`>     RETURN TF.ADD(X, SHORTCUT)`}</p>
                        <p>{`> `}</p>
                        <p className={`${isPublic ? 'text-blue-400' : 'text-red-500'} animate-pulse`}>{`> TRAINING_EPOCH: 9482 / 10000`}</p>
                        <p>{`> LOSS_FUNCTION: BINARY_CROSSENTROPY`}</p>
                        <p>{`> ACCURACY_METRIC: 99.94%`}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className={`border ${themeColors.cardBorder} ${themeColors.subCardBg} p-4 transition-colors`}>
                        <h3 className={`${themeColors.textPrimary} text-sm uppercase tracking-wider mb-2 flex items-center gap-2`}>
                          <CheckCircle2 className="w-4 h-4 text-green-500" /> Authenticity Markers
                        </h3>
                        <ul className={`${themeColors.textSecondary} text-xs space-y-2 list-disc pl-4`}>
                          <li>Sensor Pattern Noise (SPN) consistency matched to camera model</li>
                          <li>Natural light scattering and shadow fallout</li>
                          <li>ISO grain uniformity across distinct lighting zones</li>
                        </ul>
                      </div>
                      <div className={`border ${themeColors.cardBorder} ${themeColors.subCardBg} p-4 transition-colors`}>
                         <h3 className={`${themeColors.textPrimary} text-sm uppercase tracking-wider mb-2 flex items-center gap-2`}>
                          <Shield className={`w-4 h-4 ${isPublic ? 'text-blue-500' : 'text-red-500'}`} /> Detection Vectors
                        </h3>
                        <ul className={`${themeColors.textSecondary} text-xs space-y-2 list-disc pl-4`}>
                          <li>Inconsistent shadow projection angles</li>
                          <li>Text aliasing irregularities & OCR mismatches</li>
                          <li>Diffusion grid artifacts & frequency spectrum anomalies</li>
                        </ul>
                      </div>
                    </div>
                 </div>
               )}

               {activeTab === 'ela' && (
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 ${themeColors.iconBg} rounded flex items-center justify-center transition-colors`}>
                        <ScanLine className={`w-6 h-6 ${isPublic ? 'text-blue-500' : 'text-red-500'}`} />
                      </div>
                      <div>
                        <h2 className={`text-2xl ${themeColors.textPrimary} uppercase tracking-widest font-light`}>Error Level Analysis</h2>
                        <div className={`${isPublic ? 'text-blue-500' : 'text-red-500'} font-mono text-xs mt-1`}>MODULE_ID: ELA-V2</div>
                      </div>
                    </div>

                    <div className="prose max-w-none mb-8">
                      <p className={`${themeColors.textSecondary} font-light leading-relaxed`}>
                        Error Level Analysis (ELA) works on the principle that JPEG images lose quality at a uniform rate each time they are saved. When an image is manipulated, the inserted or altered sections often originate from a different source or have been saved at a different compression level than the original background background.
                      </p>
                      <p className={`${themeColors.textSecondary} font-light leading-relaxed mt-4`}>
                        Our algorithm re-saves the image at a known error rate (typically 95%) and subtracts the pixel values from the original. The resulting "error map" highlights these discrepancies. Authentic images display uniform noise; manipulated regions appear as bright, high-contrast patches of "alien" pixels that defy the global compression matrix.
                      </p>
                    </div>

                    {/* Visualization of ELA */}
                    <div className={`relative h-48 ${isPublic ? 'bg-slate-200' : 'bg-zinc-900'} border ${themeColors.cardBorder} mb-8 overflow-hidden flex items-center justify-center transition-colors`}>
                       {/* Grid Background */}
                       <div className="absolute inset-0" style={{backgroundImage: `linear-gradient(${isPublic ? '#94a3b8' : 'zinc-800'} 1px, transparent 1px), linear-gradient(90deg, ${isPublic ? '#94a3b8' : 'zinc-800'} 1px, transparent 1px)`, backgroundSize: '20px 20px', opacity: 0.1}}></div>
                       
                       <div className="flex items-center gap-8">
                          <div className="text-center">
                             <div className="w-24 h-32 bg-white flex items-center justify-center text-black font-mono text-[10px] mb-2 border border-gray-300">ORIGINAL</div>
                             <span className={`text-xs ${themeColors.textSecondary}`}>Source</span>
                          </div>
                          <div className={`${isPublic ? 'text-blue-600' : 'text-red-600'} animate-pulse`}>→</div>
                          <div className="text-center">
                             <div className={`w-24 h-32 bg-black border ${isPublic ? 'border-blue-600' : 'border-red-600'} relative overflow-hidden mb-2`}>
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-overlay"></div>
                                <div className={`absolute top-10 left-4 w-12 h-12 ${isPublic ? 'bg-blue-600' : 'bg-red-600'} blur-xl opacity-60 rounded-full animate-pulse`}></div>
                                <div className="absolute bottom-4 right-4 w-8 h-8 bg-blue-500 blur-xl opacity-40 rounded-full"></div>
                             </div>
                             <span className={`text-xs ${isPublic ? 'text-blue-500' : 'text-red-500'}`}>Heatmap</span>
                          </div>
                       </div>
                    </div>

                    <div className={`p-4 ${isPublic ? 'bg-blue-50 border-blue-600 text-blue-800' : 'bg-red-950/20 border-red-600 text-gray-400'} border-l-2 text-sm italic transition-colors`}>
                      "Digital manipulation leaves a mathematical scar. ELA makes that scar glow."
                    </div>
                 </div>
               )}

               {activeTab === 'meta' && (
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 ${themeColors.iconBg} rounded flex items-center justify-center transition-colors`}>
                        <Database className={`w-6 h-6 ${isPublic ? 'text-blue-500' : 'text-red-500'}`} />
                      </div>
                      <div>
                        <h2 className={`text-2xl ${themeColors.textPrimary} uppercase tracking-widest font-light`}>Metadata Forensics</h2>
                        <div className={`${isPublic ? 'text-blue-500' : 'text-red-500'} font-mono text-xs mt-1`}>MODULE_ID: EXIF-NULL</div>
                      </div>
                    </div>

                    <div className="prose max-w-none mb-8">
                      <p className={`${themeColors.textSecondary} font-light leading-relaxed`}>
                        AI-generated images typically lack the complex metadata signatures found in genuine camera files. Our system deeply parses 140+ metadata points including shutter speed, aperture, focal length, GPS coordinates, and proprietary manufacturer notes (MakerNotes) to validate the file's origin.
                      </p>
                      <p className={`${themeColors.textSecondary} font-light leading-relaxed mt-4`}>
                        We also perform logical cross-referencing: checking if the lighting conditions match the reported time of day, if the GPS coordinates are physically possible given previous upload history ("Impossible Travel" detection), and if the software version tag matches the device's release window.
                      </p>
                    </div>

                    {/* Data Table */}
                    <div className={`${isPublic ? 'bg-white border-slate-200' : 'bg-zinc-900/50 border-zinc-800'} border overflow-hidden transition-colors`}>
                      <table className="w-full text-left text-xs font-mono">
                        <thead className={`${isPublic ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-zinc-950 text-gray-500 border-zinc-800'} border-b`}>
                          <tr>
                            <th className="p-3 uppercase tracking-wider">Parameter</th>
                            <th className="p-3 uppercase tracking-wider">Authentic</th>
                            <th className={`p-3 uppercase tracking-wider ${isPublic ? 'text-red-600' : 'text-red-500'}`}>Synthetic</th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y ${isPublic ? 'divide-slate-100 text-slate-700' : 'divide-zinc-800 text-gray-300'}`}>
                          <tr>
                            <td className={`p-3 ${isPublic ? 'text-slate-500' : 'text-zinc-500'}`}>EXIF:Make</td>
                            <td className="p-3">Apple / Samsung / Canon</td>
                            <td className={`p-3 ${isPublic ? 'text-red-600' : 'text-red-500'}`}>NULL / Unknown</td>
                          </tr>
                          <tr>
                            <td className={`p-3 ${isPublic ? 'text-slate-500' : 'text-zinc-500'}`}>EXIF:Software</td>
                            <td className="p-3">iOS 17.2 / Adobe Photoshop</td>
                            <td className={`p-3 ${isPublic ? 'text-red-600' : 'text-red-500'}`}>Stable Diffusion 1.5</td>
                          </tr>
                           <tr>
                            <td className={`p-3 ${isPublic ? 'text-slate-500' : 'text-zinc-500'}`}>Chromatic Subsampling</td>
                            <td className="p-3">4:2:0 / 4:2:2</td>
                            <td className={`p-3 ${isPublic ? 'text-red-600' : 'text-red-500'}`}>4:4:4 (Common in AI)</td>
                          </tr>
                          <tr>
                            <td className={`p-3 ${isPublic ? 'text-slate-500' : 'text-zinc-500'}`}>Quantization Table</td>
                            <td className="p-3">Standard DQT</td>
                            <td className={`p-3 ${isPublic ? 'text-red-600' : 'text-red-500'}`}>Flat / Linear</td>
                          </tr>
                           <tr>
                            <td className={`p-3 ${isPublic ? 'text-slate-500' : 'text-zinc-500'}`}>ICC Profile</td>
                            <td className="p-3">Display P3 / sRGB IEC61966</td>
                            <td className={`p-3 ${isPublic ? 'text-red-600' : 'text-red-500'}`}>Generic Linear</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                 </div>
               )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
