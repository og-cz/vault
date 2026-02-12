import { User, Fingerprint, Dna, Scan, Binary, ShieldAlert, FileKey, Shield, AlertTriangle, Key, Target, Globe2, HardDrive, CheckCircle } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export function AboutPage() {
  const { isPublic } = useTheme();

  const leader = {
    name: 'OGCZ',
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

  // Theme-based colors
  const themeColors = {
    bg: isPublic ? 'bg-slate-50' : 'bg-black',
    textPrimary: isPublic ? 'text-slate-900' : 'text-white',
    textSecondary: isPublic ? 'text-slate-500' : 'text-gray-400',
    accent: isPublic ? 'text-blue-600' : 'text-red-600',
    accentBorder: isPublic ? 'border-blue-200' : 'border-red-900/50',
    accentBg: isPublic ? 'bg-blue-50' : 'bg-red-950/20',
    cardBg: isPublic ? 'bg-white' : 'bg-zinc-900',
    cardBorder: isPublic ? 'border-slate-200' : 'border-zinc-800',
    gradientLine: isPublic ? 'from-transparent via-blue-300 to-transparent' : 'from-transparent via-red-900 to-transparent',
    headerOverlay: isPublic ? 'from-blue-50/50 to-slate-50' : 'from-red-950/20 to-black',
    boxShadow: isPublic ? 'shadow-lg shadow-blue-100/50' : '',
    decorativeBorder: isPublic ? 'border-blue-600/50' : 'border-red-600/50',
  };

  return (
    <div className={`${themeColors.bg} min-h-screen pb-20 relative overflow-hidden transition-colors duration-500`}>
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className={`absolute top-0 left-10 w-px h-full bg-gradient-to-b ${themeColors.gradientLine}`}></div>
        <div className={`absolute top-0 right-10 w-px h-full bg-gradient-to-b ${themeColors.gradientLine}`}></div>
        <div className={`absolute top-0 left-1/4 w-px h-full bg-gradient-to-b ${themeColors.gradientLine} dashed`}></div>
        <div className={`absolute top-0 right-1/4 w-px h-full bg-gradient-to-b ${themeColors.gradientLine} dashed`}></div>
      </div>

      {/* Header Section */}
      <section className="relative pt-12 pb-20">
        <div className={`absolute top-0 inset-x-0 h-96 bg-gradient-to-b ${themeColors.headerOverlay} pointer-events-none`}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <h1 className={`text-5xl md:text-7xl mb-6 font-normal tracking-wide transition-colors ${themeColors.textPrimary}`}>
            Personnel Database
          </h1>
          
          <p className={`${themeColors.textSecondary} max-w-2xl mx-auto text-sm tracking-wide`}>
            Authorized personnel with active security credentials.
          </p>
        </div>
      </section>

      {/* Team Hierarchy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-10">
        {/* Top Level - Leader */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-sm group relative">
            <div className={`absolute -inset-1 bg-gradient-to-r ${isPublic ? 'from-blue-600 to-blue-900' : 'from-red-600 to-red-900'} rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200`}></div>
            
            <div className={`relative ${themeColors.cardBg} border ${themeColors.cardBorder} p-8 flex flex-col items-center text-center overflow-hidden transition-colors ${themeColors.boxShadow}`}>
              {/* Decorative Corner */}
              <div className={`absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 ${themeColors.decorativeBorder}`}></div>
              <div className={`absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 ${themeColors.decorativeBorder}`}></div>
              
              <div className="relative mb-6">
                <div className={`w-24 h-24 ${isPublic ? 'bg-slate-50' : 'bg-black'} border-2 ${themeColors.accentBorder} rounded-full flex items-center justify-center relative z-10 group-hover:${isPublic ? 'border-blue-600' : 'border-red-600'} transition-colors`}>
                    <User className={`w-10 h-10 ${themeColors.textSecondary} group-hover:${themeColors.accent} transition-colors`} />
                </div>
                {/* Orbiting ring - SLOWER */}
                <div className={`absolute inset-0 border ${isPublic ? 'border-blue-600/30' : 'border-red-600/30'} rounded-full scale-125 animate-[spin_20s_linear_infinite]`}></div>
              </div>
              
              <h3 className={`${themeColors.textPrimary} text-xl uppercase tracking-widest mb-1`}>{leader.name}</h3>
              <p className={`${themeColors.accent} text-xs uppercase tracking-wider mb-4`}>{leader.role}</p>
            </div>
          </div>
        </div>

        {/* Second Level - Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="group relative">
              <div className={`relative ${isPublic ? 'bg-white' : 'bg-zinc-900/50'} border ${themeColors.cardBorder} p-6 flex flex-col items-center text-center overflow-hidden hover:${isPublic ? 'bg-slate-50' : 'bg-zinc-900'} transition-colors ${themeColors.boxShadow}`}>
                {/* Decorative Scan Line */}
                <div className={`absolute top-0 left-0 w-full h-[2px] ${isPublic ? 'bg-blue-600/50' : 'bg-red-600/50'} transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-linear`}></div>
                
                <div className={`w-16 h-16 ${isPublic ? 'bg-slate-50' : 'bg-black'} border ${isPublic ? 'border-slate-200' : 'border-zinc-700'} rounded-full flex items-center justify-center mb-4 group-hover:${isPublic ? 'border-blue-600/50' : 'border-red-600/50'} transition-colors`}>
                  <User className={`w-6 h-6 ${themeColors.textSecondary} group-hover:${themeColors.accent} transition-colors`} />
                </div>
                
                <h3 className={`${themeColors.textPrimary} text-sm uppercase tracking-widest mb-1`}>{member.name}</h3>
                <p className={`${isPublic ? 'text-blue-600/80' : 'text-red-600/80'} text-[10px] uppercase tracking-wider mb-3`}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security Protocols */}
      <section className={`${isPublic ? 'bg-slate-100 border-slate-200' : 'bg-zinc-900/30 border-zinc-800'} border-y py-20 mb-20 relative transition-colors`}>
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-3 mb-12">
                <Target className={`w-6 h-6 ${themeColors.accent}`} />
                <h2 className={`text-2xl ${themeColors.textPrimary} uppercase tracking-widest font-light text-center`}>Operational Protocols</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className={`${isPublic ? 'bg-white' : 'bg-black'} border ${themeColors.cardBorder} p-6 relative group hover:${themeColors.accentBorder} transition-colors ${themeColors.boxShadow}`}>
                    <div className={`absolute top-0 left-0 w-1 h-full ${isPublic ? 'bg-blue-600' : 'bg-red-600'} scale-y-0 group-hover:scale-y-100 transition-transform`}></div>
                    <h3 className={`${themeColors.textPrimary} text-lg uppercase tracking-wider mb-2`}>Protocol: OMEGA</h3>
                    <p className={`${themeColors.textSecondary} text-xs leading-relaxed`}>
                        Total information containment. Any unauthorized data leaks are detected and neutralized within 0.04 seconds.
                    </p>
                </div>
                
                <div className={`${isPublic ? 'bg-white' : 'bg-black'} border ${themeColors.cardBorder} p-6 relative group hover:${themeColors.accentBorder} transition-colors ${themeColors.boxShadow}`}>
                     <div className={`absolute top-0 left-0 w-1 h-full ${isPublic ? 'bg-blue-600' : 'bg-red-600'} scale-y-0 group-hover:scale-y-100 transition-transform`}></div>
                    <h3 className={`${themeColors.textPrimary} text-lg uppercase tracking-wider mb-2`}>Protocol: SENTINEL</h3>
                    <p className={`${themeColors.textSecondary} text-xs leading-relaxed`}>
                        Automated threat response. Our systems proactively scan for manipulation signatures before content is public.
                    </p>
                </div>

                <div className={`${isPublic ? 'bg-white' : 'bg-black'} border ${themeColors.cardBorder} p-6 relative group hover:${themeColors.accentBorder} transition-colors ${themeColors.boxShadow}`}>
                     <div className={`absolute top-0 left-0 w-1 h-full ${isPublic ? 'bg-blue-600' : 'bg-red-600'} scale-y-0 group-hover:scale-y-100 transition-transform`}></div>
                    <h3 className={`${themeColors.textPrimary} text-lg uppercase tracking-wider mb-2`}>Protocol: KEEPER</h3>
                    <p className={`${themeColors.textSecondary} text-xs leading-relaxed`}>
                        Encryption standards exceeding military grade. User anonymity and data integrity are absolute.
                    </p>
                </div>
            </div>
         </div>
      </section>

      {/* NEW CONTENT: Core Directives */}
      <section className={`py-20 ${isPublic ? 'bg-white' : 'bg-black'} relative z-10 mb-20 transition-colors`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div>
                  <h2 className={`text-3xl ${themeColors.textPrimary} uppercase tracking-widest font-light mb-8 border-l-4 ${isPublic ? 'border-blue-600' : 'border-red-600'} pl-6`}>
                      Primary Directives
                  </h2>
                  <div className="space-y-6">
                      <div className="flex items-start gap-4">
                          <div className={`mt-1 ${isPublic ? 'bg-slate-100 border-slate-200' : 'bg-zinc-900 border-zinc-800'} p-2 border`}>
                              <span className={`${themeColors.accent} font-mono font-bold`}>01</span>
                          </div>
                          <div>
                              <h4 className={`${themeColors.textPrimary} text-lg uppercase tracking-wider mb-2`}>Maintain Objective Reality</h4>
                              <p className={`${themeColors.textSecondary} text-sm leading-relaxed`}>
                                  In an age of synthetic media, truth is our most valuable currency. We must preserve the boundary between the authentic and the fabricated at all costs.
                              </p>
                          </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                          <div className={`mt-1 ${isPublic ? 'bg-slate-100 border-slate-200' : 'bg-zinc-900 border-zinc-800'} p-2 border`}>
                              <span className={`${themeColors.accent} font-mono font-bold`}>02</span>
                          </div>
                          <div>
                              <h4 className={`${themeColors.textPrimary} text-lg uppercase tracking-wider mb-2`}>Absolute Surveillance</h4>
                              <p className={`${themeColors.textSecondary} text-sm leading-relaxed`}>
                                  Total oversight of digital channels ensures that no manipulation goes undetected. Visibility is the precursor to security.
                              </p>
                          </div>
                      </div>

                      <div className="flex items-start gap-4">
                          <div className={`mt-1 ${isPublic ? 'bg-slate-100 border-slate-200' : 'bg-zinc-900 border-zinc-800'} p-2 border`}>
                              <span className={`${themeColors.accent} font-mono font-bold`}>03</span>
                          </div>
                          <div>
                              <h4 className={`${themeColors.textPrimary} text-lg uppercase tracking-wider mb-2`}>Zero Compromise</h4>
                              <p className={`${themeColors.textSecondary} text-sm leading-relaxed`}>
                                  Accuracy rates below 99.9% are unacceptable. Our neural networks are retrained daily to adapt to evolving generative threats.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Corporate Info Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10 mb-20">
        <div className={`${isPublic ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900/20 border-zinc-800'} border p-8 md:p-12 relative overflow-hidden transition-colors`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, ${isPublic ? '#2563eb' : '#dc2626'} 1px, transparent 0)`, 
                backgroundSize: '24px 24px'
            }}></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <div>
                    <div className={`border-l-4 ${isPublic ? 'border-blue-600' : 'border-red-600'} pl-6 mb-8`}>
                        <h2 className={`text-4xl ${themeColors.textPrimary} mb-2 font-light uppercase tracking-widest`}>
                        VAULT Corporation
                        </h2>
                        <p className={`${themeColors.accent} text-sm tracking-[0.3em] uppercase`}>Classified Information</p>
                    </div>
                    <div className={`prose max-w-none ${themeColors.textSecondary} font-light leading-relaxed text-sm text-justify`}>
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
                    <div className={`border ${themeColors.cardBorder} ${isPublic ? 'bg-white shadow-xl' : 'bg-black shadow-2xl'} p-6`}>
                        <div className={`flex items-center justify-between mb-6 border-b ${themeColors.cardBorder} pb-4`}>
                            <h3 className={`${themeColors.accent} uppercase tracking-widest text-xs font-bold flex items-center gap-2`}>
                                <Binary className="w-4 h-4" />
                                System Diagnostics
                            </h3>
                            <div className="flex gap-1">
                                <div className={`w-2 h-2 ${isPublic ? 'bg-blue-600' : 'bg-red-600'} rounded-full animate-pulse`}></div>
                                <div className={`w-2 h-2 ${isPublic ? 'bg-blue-600' : 'bg-red-600'} rounded-full animate-pulse delay-75`}></div>
                                <div className={`w-2 h-2 ${isPublic ? 'bg-blue-600' : 'bg-red-600'} rounded-full animate-pulse delay-150`}></div>
                            </div>
                        </div>
                        
                        <div className="space-y-4 font-mono text-xs">
                            <div className="flex justify-between items-center group">
                                <span className={`${themeColors.textSecondary} group-hover:${themeColors.textPrimary} transition-colors`}>Global Surveillance</span>
                                <span className="text-green-500 bg-green-900/20 px-2 py-0.5 rounded border border-green-900/30">ONLINE</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span className={`${themeColors.textSecondary} group-hover:${themeColors.textPrimary} transition-colors`}>Neural Network</span>
                                <span className="text-green-500 bg-green-900/20 px-2 py-0.5 rounded border border-green-900/30">ACTIVE</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span className={`${themeColors.textSecondary} group-hover:${themeColors.textPrimary} transition-colors`}>Bio-Metric Database</span>
                                <span className="text-green-500 bg-green-900/20 px-2 py-0.5 rounded border border-green-900/30">SECURE</span>
                            </div>
                            
                            <div className={`mt-6 pt-6 border-t ${themeColors.cardBorder}`}>
                                <div className={`flex justify-between ${themeColors.textSecondary} mb-2`}>
                                    <span>Processing Load</span>
                                    <span>84%</span>
                                </div>
                                <div className={`w-full ${isPublic ? 'bg-slate-100' : 'bg-zinc-900'} h-1 overflow-hidden`}>
                                    <div className={`${isPublic ? 'bg-blue-600' : 'bg-red-600'} h-full w-[84%] animate-[loading_3s_ease-in-out_infinite]`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
