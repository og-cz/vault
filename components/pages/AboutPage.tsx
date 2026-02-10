import { User, Fingerprint, Dna, Scan, Binary, ShieldAlert, FileKey, Shield, AlertTriangle, Key, Target, Globe2, HardDrive, CheckCircle } from 'lucide-react';

export function AboutPage() {
  const leader = {
    name: 'Main Person 1',
    role: 'Main Programmer 1',
    code: '001-A'
  };

  const teamMembers = [
    {
      name: 'Person 2',
      role: 'Programmer 2',
      code: '002-B'
    },
    {
      name: 'Person 3',
      role: 'Designer',
      code: '003-C'
    },
    {
      name: 'Person 4',
      role: 'Designer',
      code: '004-D'
    },
    {
      name: 'Security Systems',
      role: 'System Admin',
      code: '005-E'
    }
  ];

  return (
    <div className="bg-black min-h-screen pb-20 relative overflow-hidden">
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-10 w-px h-full bg-gradient-to-b from-transparent via-red-900 to-transparent"></div>
        <div className="absolute top-0 right-10 w-px h-full bg-gradient-to-b from-transparent via-red-900 to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-900/50 to-transparent dashed"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-900/50 to-transparent dashed"></div>
      </div>

      {/* Header Section */}
      <section className="relative pt-12 pb-20">
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-red-950/20 to-black pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 border border-red-900/50 px-4 py-1 rounded-full bg-red-950/30 mb-6 backdrop-blur-md">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span className="text-red-500 uppercase tracking-widest text-xs font-bold">Clearance Level 5</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl text-white mb-6 font-normal tracking-wide">
            Personnel Database
          </h1>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-sm tracking-wide">
            Authorized personnel with active security credentials.
          </p>
        </div>
      </section>

      {/* Team Hierarchy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-10">
        {/* Top Level - Leader */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-sm group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-zinc-900 border border-zinc-800 p-8 flex flex-col items-center text-center overflow-hidden">
              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-red-600/50"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-red-600/50"></div>
              
              <div className="w-24 h-24 bg-black border-2 border-red-900/50 rounded-full flex items-center justify-center mb-6 group-hover:border-red-600 transition-colors">
                <User className="w-10 h-10 text-gray-500 group-hover:text-red-600 transition-colors" />
              </div>
              
              <h3 className="text-white text-xl uppercase tracking-widest mb-1">{leader.name}</h3>
              <p className="text-red-600 text-xs uppercase tracking-wider mb-4">{leader.role}</p>
              
              <div className="w-full h-px bg-zinc-800 mb-4"></div>
              <p className="text-zinc-600 font-mono text-xs tracking-widest">ID: {leader.code}</p>
            </div>
          </div>
        </div>

        {/* Second Level - Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="group relative">
              <div className="relative bg-zinc-900/50 border border-zinc-800 p-6 flex flex-col items-center text-center overflow-hidden hover:bg-zinc-900 transition-colors">
                {/* Decorative Scan Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600/50 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-linear"></div>
                
                <div className="w-16 h-16 bg-black border border-zinc-700 rounded-full flex items-center justify-center mb-4 group-hover:border-red-600/50 transition-colors">
                  <User className="w-6 h-6 text-gray-600 group-hover:text-red-600 transition-colors" />
                </div>
                
                <h3 className="text-white text-sm uppercase tracking-widest mb-1">{member.name}</h3>
                <p className="text-red-600/80 text-[10px] uppercase tracking-wider mb-3">{member.role}</p>
                
                <div className="w-full bg-zinc-800/50 px-2 py-1 rounded">
                   <p className="text-zinc-500 font-mono text-[10px] tracking-widest">ID: {member.code}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security Protocols */}
      <section className="bg-zinc-900/30 border-y border-zinc-800 py-20 mb-20 relative">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-3 mb-12">
                <Target className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl text-white uppercase tracking-widest font-light text-center">Operational Protocols</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-black border border-zinc-800 p-6 relative group hover:border-red-900/50 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-600 scale-y-0 group-hover:scale-y-100 transition-transform"></div>
                    <Shield className="w-8 h-8 text-red-600 mb-4" />
                    <h3 className="text-white text-lg uppercase tracking-wider mb-2">Protocol: OMEGA</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                        Total information containment. Any unauthorized data leaks are detected and neutralized within 0.04 seconds.
                    </p>
                </div>
                
                <div className="bg-black border border-zinc-800 p-6 relative group hover:border-red-900/50 transition-colors">
                     <div className="absolute top-0 left-0 w-1 h-full bg-red-600 scale-y-0 group-hover:scale-y-100 transition-transform"></div>
                    <AlertTriangle className="w-8 h-8 text-red-600 mb-4" />
                    <h3 className="text-white text-lg uppercase tracking-wider mb-2">Protocol: SENTINEL</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                        Automated threat response. Our systems proactively scan for manipulation signatures before content is public.
                    </p>
                </div>

                <div className="bg-black border border-zinc-800 p-6 relative group hover:border-red-900/50 transition-colors">
                     <div className="absolute top-0 left-0 w-1 h-full bg-red-600 scale-y-0 group-hover:scale-y-100 transition-transform"></div>
                    <Key className="w-8 h-8 text-red-600 mb-4" />
                    <h3 className="text-white text-lg uppercase tracking-wider mb-2">Protocol: KEEPER</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                        Encryption standards exceeding military grade. User anonymity and data integrity are absolute.
                    </p>
                </div>
            </div>
         </div>
      </section>

      {/* NEW CONTENT: Core Directives */}
      <section className="py-20 bg-black relative z-10 mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div>
                      <h2 className="text-3xl text-white uppercase tracking-widest font-light mb-8 border-l-4 border-red-600 pl-6">
                          Primary Directives
                      </h2>
                      <div className="space-y-6">
                          <div className="flex items-start gap-4">
                              <div className="mt-1 bg-zinc-900 p-2 border border-zinc-800">
                                  <span className="text-red-600 font-mono font-bold">01</span>
                              </div>
                              <div>
                                  <h4 className="text-white text-lg uppercase tracking-wider mb-2">Maintain Objective Reality</h4>
                                  <p className="text-gray-500 text-sm leading-relaxed">
                                      In an age of synthetic media, truth is our most valuable currency. We must preserve the boundary between the authentic and the fabricated at all costs.
                                  </p>
                              </div>
                          </div>
                          
                          <div className="flex items-start gap-4">
                              <div className="mt-1 bg-zinc-900 p-2 border border-zinc-800">
                                  <span className="text-red-600 font-mono font-bold">02</span>
                              </div>
                              <div>
                                  <h4 className="text-white text-lg uppercase tracking-wider mb-2">Absolute Surveillance</h4>
                                  <p className="text-gray-500 text-sm leading-relaxed">
                                      Total oversight of digital channels ensures that no manipulation goes undetected. Visibility is the precursor to security.
                                  </p>
                              </div>
                          </div>

                          <div className="flex items-start gap-4">
                              <div className="mt-1 bg-zinc-900 p-2 border border-zinc-800">
                                  <span className="text-red-600 font-mono font-bold">03</span>
                              </div>
                              <div>
                                  <h4 className="text-white text-lg uppercase tracking-wider mb-2">Zero Compromise</h4>
                                  <p className="text-gray-500 text-sm leading-relaxed">
                                      Accuracy rates below 99.9% are unacceptable. Our neural networks are retrained daily to adapt to evolving generative threats.
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  {/* Global Infrastructure Map Representation */}
                  <div className="bg-zinc-900/10 border border-zinc-800 p-8 relative">
                      <div className="flex items-center justify-between mb-8">
                          <h3 className="text-white uppercase tracking-widest text-sm flex items-center gap-2">
                              <Globe2 className="w-4 h-4 text-red-600" />
                              Infrastructure Nodes
                          </h3>
                          <span className="text-[10px] text-green-500 bg-green-900/10 border border-green-900/30 px-2 py-1 rounded">ALL SYSTEMS NOMINAL</span>
                      </div>
                      
                      <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-black/50 border-l-2 border-red-600">
                              <div className="flex items-center gap-3">
                                  <HardDrive className="w-4 h-4 text-zinc-500" />
                                  <span className="text-gray-300 text-xs uppercase tracking-wide">North America Server</span>
                              </div>
                              <span className="text-red-600 text-[10px] font-mono">LAT: 40.7128 N</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-black/50 border-l-2 border-red-600">
                              <div className="flex items-center gap-3">
                                  <HardDrive className="w-4 h-4 text-zinc-500" />
                                  <span className="text-gray-300 text-xs uppercase tracking-wide">Europe Neural Hub</span>
                              </div>
                              <span className="text-red-600 text-[10px] font-mono">LAT: 52.5200 N</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-black/50 border-l-2 border-red-600">
                              <div className="flex items-center gap-3">
                                  <HardDrive className="w-4 h-4 text-zinc-500" />
                                  <span className="text-gray-300 text-xs uppercase tracking-wide">Asia Pacific Relay</span>
                              </div>
                              <span className="text-red-600 text-[10px] font-mono">LAT: 35.6762 N</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-black/50 border-l-2 border-red-600">
                              <div className="flex items-center gap-3">
                                  <HardDrive className="w-4 h-4 text-zinc-500" />
                                  <span className="text-gray-300 text-xs uppercase tracking-wide">Deep Storage Facility</span>
                              </div>
                              <span className="text-red-600 text-[10px] font-mono">CLASSIFIED</span>
                          </div>
                      </div>
                      
                      <div className="mt-8 pt-4 border-t border-zinc-800">
                           <p className="text-[10px] text-zinc-600 font-mono text-center">
                               TOTAL STORAGE CAPACITY: 840 ZETTABYTES
                           </p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Corporate Info Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10 mb-20">
        <div className="bg-zinc-900/20 border border-zinc-800 p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, #dc2626 1px, transparent 0)', backgroundSize: '24px 24px'}}></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <div>
                    <div className="border-l-4 border-red-600 pl-6 mb-8">
                        <h2 className="text-4xl text-white mb-2 font-light uppercase tracking-widest">
                        VAULT Corporation
                        </h2>
                        <p className="text-red-600 text-sm tracking-[0.3em] uppercase">Classified Information</p>
                    </div>
                    <div className="prose prose-invert max-w-none text-gray-400 font-light leading-relaxed text-sm text-justify">
                        <p className="mb-6">
                            VAULT Corporation is a global mega-corporation in the information security sector, known for its advanced bio-metric research and surveillance technologies. Founded with the goal of advancing the security of life itself, VAULT's history is intertwined with the pursuit of absolute truth in the digital age.
                        </p>
                        <p>
                            Leading to catastrophic consequences for those who wish to deceive, our algorithms ensure that reality remains objective. We are dedicated to the preservation of authenticity in an increasingly fabricated world.
                        </p>
                    </div>
                </div>
                
                <div className="relative">
                     {/* System Status Panel */}
                    <div className="border border-zinc-800 bg-black p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
                            <h3 className="text-red-600 uppercase tracking-widest text-xs font-bold flex items-center gap-2">
                                <Binary className="w-4 h-4" />
                                System Diagnostics
                            </h3>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse delay-75"></div>
                                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse delay-150"></div>
                            </div>
                        </div>
                        
                        <div className="space-y-4 font-mono text-xs">
                            <div className="flex justify-between items-center group">
                                <span className="text-gray-500 group-hover:text-white transition-colors">Global Surveillance</span>
                                <span className="text-green-500 bg-green-900/20 px-2 py-0.5 rounded border border-green-900/30">ONLINE</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span className="text-gray-500 group-hover:text-white transition-colors">Neural Network</span>
                                <span className="text-green-500 bg-green-900/20 px-2 py-0.5 rounded border border-green-900/30">ACTIVE</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span className="text-gray-500 group-hover:text-white transition-colors">Bio-Metric Database</span>
                                <span className="text-green-500 bg-green-900/20 px-2 py-0.5 rounded border border-green-900/30">SECURE</span>
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-zinc-800">
                                <div className="flex justify-between text-gray-500 mb-2">
                                    <span>Processing Load</span>
                                    <span>84%</span>
                                </div>
                                <div className="w-full bg-zinc-900 h-1 overflow-hidden">
                                    <div className="bg-red-600 h-full w-[84%] animate-[loading_3s_ease-in-out_infinite]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Strategic Vision Roadmap */}
      <section className="border-t border-zinc-900 py-24 relative z-10 bg-gradient-to-b from-zinc-950 to-black">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                 <h2 className="text-3xl text-white uppercase tracking-widest font-light mb-4"> 
                    Strategic Vision
                 </h2>
                 <div className="inline-block bg-red-950/30 border border-red-900/50 px-6 py-2 rounded-full">
                     <span className="text-red-500 font-mono text-sm tracking-widest">PROJECT: AURA</span>
                 </div>
              </div>
              
              <div className="relative">
                  {/* Center Line */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-gradient-to-b from-red-900/20 via-red-600 to-red-900/20"></div>
                  
                  {/* Timeline Items */}
                  <div className="space-y-24">
                      {/* Item 1 - Left */}
                      <div className="flex flex-col md:flex-row items-center md:items-start justify-between relative group">
                          <div className="md:w-5/12 text-left md:text-right md:pr-12 pl-12 md:pl-0 mb-4 md:mb-0 w-full hover:scale-105 transition-transform duration-300">
                              <h3 className="text-red-600 text-xl uppercase tracking-widest mb-2 font-bold flex items-center justify-end gap-2">
                                Phase 1: Inception
                                <FileKey className="w-5 h-5" />
                              </h3>
                              <p className="text-gray-500 text-sm leading-relaxed mb-4">Establishment of core detection algorithms and global database infrastructure.</p>
                              <span className="text-[10px] text-zinc-500 font-mono mt-3 inline-block border border-zinc-800 px-3 py-1 rounded bg-zinc-900">STATUS: COMPLETED</span>
                          </div>
                          
                          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-black rounded-full border-4 border-red-900 z-10 mt-1 flex items-center justify-center">
                              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                          </div>
                          
                          <div className="md:w-5/12 md:pl-12"></div>
                      </div>

                      {/* Item 2 - Right */}
                      <div className="flex flex-col md:flex-row items-center md:items-start justify-between relative group">
                          <div className="md:w-5/12 md:text-right md:pr-12 hidden md:block"></div>
                          
                          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full border-4 border-black z-10 mt-1 shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse"></div>
                          
                          <div className="md:w-5/12 text-left md:pl-12 pl-12 w-full hover:scale-105 transition-transform duration-300">
                              <h3 className="text-white text-xl uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
                                <Scan className="w-5 h-5 text-red-600" />
                                Phase 2: Global Scan
                              </h3>
                              <p className="text-gray-500 text-sm leading-relaxed mb-4">Advanced AI-generated image pattern recognition and pixel-level fabrication detection for all uploaded media.</p>
                              <span className="text-[10px] text-green-500 font-mono mt-3 inline-block border border-green-900/30 bg-green-900/10 px-3 py-1 rounded animate-pulse">STATUS: ACTIVE</span>
                          </div>
                      </div>
                      
                      {/* Item 3 - Left */}
                      <div className="flex flex-col md:flex-row items-center md:items-start justify-between relative group opacity-50 hover:opacity-100 transition-opacity duration-500">
                          <div className="md:w-5/12 text-left md:text-right md:pr-12 pl-12 md:pl-0 mb-4 md:mb-0 w-full">
                              <h3 className="text-gray-400 text-xl uppercase tracking-widest mb-2 font-bold flex items-center justify-end gap-2">
                                Phase 3: Integration
                                <Dna className="w-5 h-5" />
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed mb-4">Direct neural link verification for visual cortex authentication.</p>
                              <span className="text-[10px] text-zinc-600 font-mono mt-3 inline-block border border-zinc-800 px-3 py-1 rounded">STATUS: PENDING</span>
                          </div>
                          
                          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-zinc-900 rounded-full border-4 border-zinc-800 z-10 mt-1"></div>
                          
                          <div className="md:w-5/12 md:pl-12"></div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}