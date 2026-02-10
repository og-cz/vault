import { ArrowRight, Shield, CheckCircle2, Zap, Globe, Lock, Eye, Cpu, ScanLine, FileSearch, Terminal, Activity, Radio, Wifi, Database, Server } from 'lucide-react';
import type { Page } from '../../App';
import { useEffect, useState } from 'react';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

// Background Animation Component
const CyberGrid = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Moving Grid */}
    <div className="absolute inset-0 opacity-20" 
         style={{ 
           backgroundImage: 'linear-gradient(rgba(220, 38, 38, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.3) 1px, transparent 1px)',
           backgroundSize: '50px 50px',
           transform: 'perspective(500px) rotateX(60deg)',
           transformOrigin: 'top',
           animation: 'gridMove 20s linear infinite'
         }}>
    </div>
    
    {/* Floating Particles */}
    {[...Array(20)].map((_, i) => (
      <div key={i} 
           className="absolute w-1 h-1 bg-red-600 rounded-full animate-pulse"
           style={{
             top: `${Math.random() * 100}%`,
             left: `${Math.random() * 100}%`,
             opacity: Math.random() * 0.5,
             animationDuration: `${2 + Math.random() * 3}s`,
             animationDelay: `${Math.random() * 2}s`
           }}
      />
    ))}
    
    {/* Scanning Line */}
    <div className="absolute inset-x-0 h-px bg-red-500/50 shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-[scan_8s_ease-in-out_infinite]" style={{top: '-10%'}}></div>
    
    <style>{`
      @keyframes gridMove {
        0% { background-position: 0 0; }
        100% { background-position: 0 500px; }
      }
      @keyframes scan {
        0% { top: -10%; opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { top: 110%; opacity: 0; }
      }
    `}</style>
  </div>
);

export function HomePage({ onNavigate }: HomePageProps) {
  const [glitchIndex, setGlitchIndex] = useState(0);

  // Random glitch effect trigger
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchIndex(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black min-h-screen relative selection:bg-red-900/50 selection:text-red-200">
      <CyberGrid />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 border-b border-red-900/10">
        {/* HUD Corners */}
        <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-red-600/30 rounded-tl-3xl"></div>
        <div className="absolute top-10 right-10 w-24 h-24 border-t-2 border-r-2 border-red-600/30 rounded-tr-3xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 border-b-2 border-l-2 border-red-600/30 rounded-bl-3xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-red-600/30 rounded-br-3xl"></div>

        {/* Floating Code Snippets */}
        <div className="absolute right-10 top-1/3 text-[10px] text-red-900/40 font-mono hidden lg:block space-y-1">
           <p>{'>'} INIT_PROTOCOL_ACTIVE</p>
           <p>{'>'} CONNECTING_TO_NEURAL_NET...</p>
           <p>{'>'} HANDSHAKE_ESTABLISHED</p>
           <p>{'>'} SECURE_LINK: ONLINE</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl relative">
            {/* Decorative Side Line */}
            <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-red-900 to-transparent opacity-50 hidden md:block"></div>
            
            <div className="mb-8 flex items-center gap-4">
              <span className="flex items-center gap-2 text-red-600 uppercase tracking-widest text-xs md:text-sm font-medium bg-red-950/20 px-3 py-1 border border-red-900/30 rounded">
                <Wifi className="w-4 h-4 animate-pulse" />
                System Online
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-8 tracking-tight font-light leading-tight relative">
              "Our business is <br />
              <span className={`text-red-600 font-normal inline-block relative ${glitchIndex === 1 ? 'animate-pulse' : ''}`}>
                security
                {/* Glitch Overlay */}
                <span className="absolute inset-0 text-red-400 opacity-50 animate-ping" style={{ display: glitchIndex === 1 ? 'block' : 'none' }}>security</span>
              </span> of life itself..."
            </h1>
            
            <p className="mb-12 text-gray-400 text-lg max-w-xl font-light leading-relaxed border-l-2 border-red-900/50 pl-6">
              Verify the authenticity of digital media with ease. Detect content and uncover the truth behind every file using military-grade neural analysis.
            </p>
            
            <div className="flex flex-wrap gap-6 relative">
              <button 
                onClick={() => onNavigate('upload')}
                className="group relative bg-red-600 text-white px-10 py-5 overflow-hidden uppercase text-xs md:text-sm tracking-widest font-medium transition-all hover:bg-red-700 clip-path-polygon"
              >
                <div className="absolute inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="relative flex items-center gap-3">
                  Upload Image
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                {/* Button Scan Effect */}
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
              
              <button 
                onClick={() => onNavigate('about')}
                className="group border border-red-900/50 text-red-600 px-10 py-5 uppercase text-xs md:text-sm tracking-widest font-medium hover:bg-red-950/10 transition-all flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Operations / Statistics Section */}
      <section className="bg-zinc-900/30 border-y border-red-900/20 py-24 relative overflow-hidden">
         {/* Moving background lines */}
        <div className="absolute inset-0 opacity-10" style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #991b1b 10px, #991b1b 11px)' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="flex-1 relative">
                  {/* Decorative bracket */}
                  <div className="absolute -left-6 top-0 bottom-0 w-2 border-l border-t border-b border-red-600/30 h-full"></div>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <Globe className="w-6 h-6 text-red-600 animate-[spin_10s_linear_infinite]" />
                    <h2 className="text-3xl text-white uppercase tracking-widest font-light">Global Surveillance</h2>
                  </div>
                  <p className="text-gray-400 mb-10 font-light leading-relaxed max-w-xl text-sm">
                      VAULT systems are currently monitoring digital traffic across <span className="text-white font-mono">142</span> countries. Our neural networks process petabytes of data daily to ensure global authenticity and neutralize digital deception.
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                      <div className="bg-black/40 p-4 border border-red-900/20 backdrop-blur-sm">
                          <div className="text-3xl text-white font-light mb-1 flex items-baseline gap-1">
                            1.2M
                            <span className="text-xs text-red-500 animate-pulse">+</span>
                          </div>
                          <div className="text-[10px] text-red-600 uppercase tracking-widest">Daily Scans</div>
                          <div className="w-full bg-zinc-800 h-0.5 mt-2">
                             <div className="bg-red-600 h-full w-[80%] animate-pulse"></div>
                          </div>
                      </div>
                      <div className="bg-black/40 p-4 border border-red-900/20 backdrop-blur-sm">
                          <div className="text-3xl text-white font-light mb-1">99.9%</div>
                          <div className="text-[10px] text-red-600 uppercase tracking-widest">Accuracy Rate</div>
                          <div className="w-full bg-zinc-800 h-0.5 mt-2">
                             <div className="bg-red-600 h-full w-[99%]"></div>
                          </div>
                      </div>
                      <div className="bg-black/40 p-4 border border-red-900/20 backdrop-blur-sm">
                          <div className="text-3xl text-white font-light mb-1">0%</div>
                          <div className="text-[10px] text-red-600 uppercase tracking-widest">Compromise</div>
                           <div className="w-full bg-zinc-800 h-0.5 mt-2">
                             <div className="bg-red-600 h-full w-[1%]"></div>
                          </div>
                      </div>
                  </div>
              </div>
              
              {/* Visual Element - SUPER RADAR */}
              <div className="flex-1 flex justify-center lg:justify-end relative">
                  {/* Decorative circle details */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-red-900/10 rounded-full opacity-50 pointer-events-none"></div>
                  
                  <div className="relative w-80 h-80 flex items-center justify-center">
                      {/* Base Radar */}
                      <div className="absolute inset-0 bg-black/80 rounded-full border border-red-900/30 backdrop-blur-sm"></div>
                      
                      {/* Spinning Outer Ring */}
                      <div className="absolute inset-[-10px] border border-dashed border-red-900/40 rounded-full animate-[spin_10s_linear_infinite]"></div>
                      
                      {/* Scanning Sector */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-red-900/20 to-transparent animate-[spin_4s_linear_infinite]" style={{clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)'}}></div>
                      
                      {/* Inner Circles */}
                      <div className="absolute inset-16 border border-red-900/30 rounded-full"></div>
                      <div className="absolute inset-32 border border-red-900/30 rounded-full"></div>
                      
                      {/* Blips */}
                      <div className="absolute top-10 right-20 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div>
                      <div className="absolute bottom-20 left-16 w-1 h-1 bg-red-500 rounded-full animate-ping delay-700"></div>
                      
                      {/* Central Crosshair */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-50">
                          <div className="w-full h-px bg-red-900/50"></div>
                          <div className="h-full w-px bg-red-900/50 absolute"></div>
                      </div>
                      
                      {/* Central Core */}
                      <div className="w-16 h-16 bg-black border border-red-600 rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                        <Activity className="text-red-600 w-8 h-8 animate-pulse" />
                      </div>
                      
                      {/* Floating Labels */}
                      <div className="absolute -top-4 -right-4 bg-black border border-red-900/50 px-2 py-1 text-[8px] text-red-500 font-mono">
                        SECTOR_07
                      </div>
                      <div className="absolute -bottom-4 -left-4 bg-black border border-red-900/50 px-2 py-1 text-[8px] text-red-500 font-mono">
                        SCANNING...
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </section>

      {/* SYSTEM ARCHITECTURE */}
      <section className="bg-black py-24 relative z-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 border-l-4 border-red-600 pl-6 flex items-end justify-between">
                <div>
                  <h2 className="text-3xl text-white uppercase tracking-widest font-light mb-2">System Architecture</h2>
                  <p className="text-gray-500 text-sm tracking-wide">Technical specifications of the MADE detection protocol.</p>
                </div>
                <Database className="w-8 h-8 text-zinc-800" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Method 1: CNN */}
                <div className="group relative bg-zinc-900/20 border border-zinc-800 p-8 overflow-hidden hover:border-red-600/50 transition-colors duration-500">
                    {/* Hover Slide Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
                          <Cpu className="w-10 h-10 text-red-900 group-hover:text-red-600 transition-colors" />
                      </div>
                      <h3 className="text-red-600 text-xs uppercase tracking-[0.2em] mb-4 font-bold flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                        Neural Core
                      </h3>
                      <h4 className="text-white text-2xl mb-4 font-light">CNN Pattern Recognition</h4>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 border-l border-zinc-800 pl-4 group-hover:border-red-600/30 transition-colors">
                          Advanced machine learning models trained on GAN and Diffusion outputs. Our Convolutional Neural Networks detect microscopic noise patterns invisible to the human eye.
                      </p>
                      
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono border-t border-zinc-800 pt-4 group-hover:text-zinc-400">
                          <span className="text-green-500">STATUS: ONLINE</span>
                      </div>
                    </div>
                </div>

                {/* Method 2: ELA */}
                <div className="group relative bg-zinc-900/20 border border-zinc-800 p-8 overflow-hidden hover:border-red-600/50 transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
                          <ScanLine className="w-10 h-10 text-red-900 group-hover:text-red-600 transition-colors" />
                      </div>
                      <h3 className="text-red-600 text-xs uppercase tracking-[0.2em] mb-4 font-bold flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                        Compression
                      </h3>
                      <h4 className="text-white text-2xl mb-4 font-light">Error Level Analysis</h4>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 border-l border-zinc-800 pl-4 group-hover:border-red-600/30 transition-colors">
                          Synthetic images often lack natural JPEG inconsistencies. ELA highlights altered regions by analyzing compression levels to find smooth textures.
                      </p>
                      
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono border-t border-zinc-800 pt-4 group-hover:text-zinc-400">
                          <span className="text-green-500">STATUS: ONLINE</span>
                      </div>
                    </div>
                </div>

                {/* Method 3: Metadata */}
                <div className="group relative bg-zinc-900/20 border border-zinc-800 p-8 overflow-hidden hover:border-red-600/50 transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
                          <FileSearch className="w-10 h-10 text-red-900 group-hover:text-red-600 transition-colors" />
                      </div>
                      <h3 className="text-red-600 text-xs uppercase tracking-[0.2em] mb-4 font-bold flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                        Forensics
                      </h3>
                      <h4 className="text-white text-2xl mb-4 font-light">Metadata Verification</h4>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 border-l border-zinc-800 pl-4 group-hover:border-red-600/30 transition-colors">
                          Extraction and cross-referencing of EXIF data. AI-generated content frequently lacks authentic camera signatures. Absence of these footprints is a primary indicator.
                      </p>
                      
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono border-t border-zinc-800 pt-4 group-hover:text-zinc-400">
                          <span className="text-green-500">STATUS: ONLINE</span>
                      </div>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* R&D Teaser Section */}
      <section className="bg-gradient-to-b from-zinc-950 to-black py-24 border-t border-zinc-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16">
                <div>
                    <h2 className="text-2xl text-white uppercase tracking-widest font-light mb-2 flex items-center gap-3">
                      <Lock className="w-5 h-5 text-red-600" />
                      Future Research
                    </h2>
                    <p className="text-gray-500 text-sm">Classified projects from our R&D Division</p>
                </div>
                <button onClick={() => onNavigate('about')} className="group text-red-600 hover:text-white transition-colors text-sm uppercase tracking-widest mt-4 md:mt-0 flex items-center gap-2 border border-red-900/30 px-6 py-3 hover:bg-red-900/20">
                    View Roadmap 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Project Card 1 */}
                <div className="group bg-black border border-zinc-800 p-8 flex items-start gap-6 hover:border-red-900 transition-colors cursor-default relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-red-900/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                    
                    <div className="p-4 bg-zinc-900/50 rounded border border-zinc-700 group-hover:border-red-600/50 transition-colors">
                        <Server className="w-8 h-8 text-gray-500 group-hover:text-red-600 transition-colors" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-white text-lg uppercase tracking-wider font-medium">Project: MIRROR</h3>
                            <span className="text-[10px] bg-red-950 text-red-500 px-2 py-0.5 border border-red-900">TOP SECRET</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Quantum image analysis designed to identify steganographic data hidden within standard image formats.
                        </p>
                    </div>
                </div>
                
                {/* Project Card 2 */}
                <div className="group bg-black border border-zinc-800 p-8 flex items-start gap-6 hover:border-red-900 transition-colors cursor-default relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-red-900/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>

                    <div className="p-4 bg-zinc-900/50 rounded border border-zinc-700 group-hover:border-red-600/50 transition-colors">
                        <Eye className="w-8 h-8 text-gray-500 group-hover:text-red-600 transition-colors" />
                    </div>
                    <div>
                         <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-white text-lg uppercase tracking-wider font-medium">Project: OCULUS</h3>
                            <span className="text-[10px] bg-zinc-900 text-zinc-400 px-2 py-0.5 border border-zinc-700">PROTO</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Retinal scanning integration for biometric user verification across decentralized networks.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden border-t border-red-900/20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black"></div>
        {/* Animated Rings */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
           <div className="w-[600px] h-[600px] border border-red-600 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
           <div className="absolute w-[400px] h-[400px] border border-red-600 rounded-full animate-ping" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-8 uppercase tracking-widest font-light">
            Ready to upload?
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto font-light text-lg">
            Initialize the verification sequence now.
          </p>
          <button 
            onClick={() => onNavigate('upload')}
            className="group bg-red-600 text-white px-12 py-5 hover:bg-red-700 transition-all inline-flex items-center gap-3 uppercase text-sm tracking-widest font-bold shadow-[0_0_40px_rgba(220,38,38,0.4)] hover:shadow-[0_0_80px_rgba(220,38,38,0.6)] hover:scale-105"
          >
            <Radio className="w-5 h-5 animate-pulse" />
            Launch Scanner
          </button>
        </div>
      </section>
    </div>
  );
}