import React from 'react';
// import profileImage from '../../public/android-chrome-512x512.png';
import ThreeDCard from '../ui/ThreeDCard';

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
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Profile Image */}
                    <div className="text-center">
                        <img 
                            src="/android-chrome-512x512.png" 
                            alt="Profile Image" 
                            className="w-80 h-80 rounded-full object-cover mx-auto shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transform hover:scale-105 transition-all duration-300 border-2 border-cyan-500/30"
                        />
                    </div>
                    
                    {/* About Text */}
                    <div className="space-y-6 relative z-10">
                        <p className="text-lg text-slate-100 leading-relaxed">
                            I'm currently studying CET and learning ML/DL & Fullstack Dev, i'm good with Python, Django, React.
                            Participated in multiple IoT & Embedded system designs, including hardware–software integration.
                            Built marketing automation tools to optimize ad campaign performance
                        </p>
                        <p className="text-lg text-slate-100 leading-relaxed">
                            I love playing sports such as football⚽and I'm also passionate about exploring geography🌏and nature
                        </p>
                        <div className="mt-8">
                            <a 
                                href="#" 
                                className="inline-block bg-slate-800/50 text-cyan-300 border border-cyan-500/30 px-8 py-3 rounded-lg font-semibold hover:bg-slate-700/50 hover:text-cyan-200 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-md hover:shadow-cyan-500/20"
                            >
                                View Resume
                            </a>
                        </div>
                    </div>
                </div>
                
                {/* Skills Grid */}
                <div className="mt-16">
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
                                        <h3 className="text-xl font-semibold text-slate-100 mb-2">{skill.title}</h3>
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