import React from 'react';
// import profileImage from '../../public/android-chrome-512x512.png';
import ThreeDCard from '../ui/ThreeDCard';
import ExternalLinkIcon from '../ui/ExternalLinkIcon';

const About: React.FC = () => {
    return (
        <section id="about" className="py-12 bg-slate-950">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="relative flex flex-col items-center justify-center mb-12 mt-20">
                    <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
                        <div
                            style={{
                                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                            }}
                            className="absolute inset-auto right-1/2 h-32 overflow-visible w-48 sm:w-64 md:w-80 lg:w-[20rem] mt-7 bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
                        >
                            <div className="absolute w-[100%] left-0 bg-slate-950 h-20 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                            <div className="absolute w-20 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
                        </div>
                        <div
                            style={{
                                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                            }}
                            className="absolute inset-auto left-1/2 h-32 w-48 sm:w-64 md:w-80 lg:w-[20rem] mt-7 bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
                        >
                            <div className="absolute w-20 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
                            <div className="absolute w-[100%] right-0 bg-slate-950 h-20 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                        </div>
                        <div className="absolute top-1/2 h-24 w-48 sm:w-64 md:w-80 lg:w-[20rem] translate-y-6 bg-slate-950 blur-2xl"></div>
                        <div className="absolute top-1/2 z-50 h-24 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
                        <div className="absolute inset-auto z-50 h-18 w-[18rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
                        <div className="absolute inset-auto z-30 h-18 w-40 -translate-y-[3rem] rounded-full bg-cyan-400 blur-2xl"></div>
                        <div className="absolute inset-auto z-50 h-0.5 w-48 sm:w-64 md:w-80 lg:w-[20rem] -translate-y-[3.5rem] mt-2.5 bg-cyan-400"></div>
                        <div className="absolute inset-auto z-40 h-22 w-full -translate-y-[6rem] bg-slate-950"></div>
                    </div>
                    <h2 className="relative z-50 text-4xl font-bold text-center bg-gradient-to-br from-cyan-300 via-blue-300 to-purple-300 py-4 bg-clip-text text-transparent">
                        About Me
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center scale-90 sm:scale-95 md:scale-100">
                    {/* Profile Image */}
                    <div className="text-center">
                        <img 
                            src="/android-chrome-512x512.png" 
                            alt="Profile Image" 
                            className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full object-cover mx-auto shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transform hover:scale-105 transition-all duration-300 border-2 border-cyan-500/30"
                        />
                    </div>
                    
                    {/* About Text */}
                    <div className="space-y-6 relative z-10">
                        <ul className="text-lg text-slate-100 leading-relaxed space-y-2">
                            <li>• Final-year student in CET major at HCMUTE, learning AI Agents, Automation, ML/DL & Dev</li>
                            <li>• Participated in multiple IoT & Embedded system designs, including hardware–software integration</li>
                            <li>• Built marketing automation tool for UA team to optimize ad campaign performance</li>
                        </ul>
                        <div className="mt-8">
                            <a 
                                href="#" 
                                className="group/modal-btn relative inline-flex items-center justify-center bg-slate-800/50 text-cyan-300 border border-cyan-500/30 px-8 py-3 rounded-lg font-semibold hover:text-slate-100 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-md hover:shadow-cyan-500/20 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500 before:to-blue-500 before:-translate-x-full before:transition-transform before:duration-500 hover:before:translate-x-0"
                            >
                                <span className="relative z-10 transition-opacity duration-300 group-hover/modal-btn:opacity-0">View Resume</span>
                                <ExternalLinkIcon 
                                    className="absolute w-6 h-6 text-white transition-opacity duration-300 opacity-0 group-hover/modal-btn:opacity-100 z-20"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                
                {/* Skills Grid */}
                <div className="mt-12 lg:mt-16 scale-90 sm:scale-95 md:scale-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: '💻', title: 'Frontend', description: 'TypeScript/React, TailwindCSS' },
                            { icon: '⚙️', title: 'Backend', description: 'Python, Django' },
                            { icon: '🤖', title: 'Machine Learning', description: 'Sklearn, PyTorch' },
                            { icon: '☁️', title: 'DevOps', description: 'Placeholder' }
                        ].map((skill, index) => (
                            <ThreeDCard 
                                key={index}
                                className="w-full"
                                maxRotation={25}
                                glowOpacity={0.45}
                                shadowBlur={60}
                                parallaxOffset={60}
                                enableGlow={true}
                                enableShadow={true}
                                enableParallax={true}
                            >
                                <div className="text-center p-6 bg-gradient-to-br from-cyan-900/20 via-blue-900/30 to-purple-900/20 rounded-xl border border-cyan-500/20 backdrop-blur-sm relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10"></div>
                                    <div className="relative z-10">
                                        <div className="text-4xl mb-4">{skill.icon}</div>
                                        <h3 className="text-xl font-bold text-slate-100 mb-2 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">{skill.title}</h3>
                                        <p className="text-slate-300 text-sm">{skill.description}</p>
                                    </div>
                                </div>
                            </ThreeDCard>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;