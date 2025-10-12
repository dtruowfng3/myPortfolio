import React from 'react';
import profileImage from '../assets/profile.jpg';

const About: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-4xl font-bold text-center mb-12 text-darkBlue relative">
                    About Me
                    <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-400 rounded-full"></div>
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Profile Image */}
                    <div className="text-center">
                        <img 
                            src={profileImage} 
                            alt="Profile Image" 
                            className="w-80 h-80 rounded-full object-cover mx-auto shadow-devfolio-lg hover:shadow-devfolio-lg transform hover:scale-105 transition-all duration-300"
                        />
                    </div>
                    
                    {/* About Text */}
                    <div className="space-y-6">
                        <p className="text-lg text-textLight leading-relaxed">
                            I’m currently studying CET and learning ML/DL & Fullstack Dev, i’m good with Python, Django, React.
                            Participated in multiple IoT & Embedded system designs, including hardware–software integration.
                            Built marketing automation tools to optimize ad campaign performance
                        </p>
                        <p className="text-lg text-textLight leading-relaxed">
                            I love playing sports such as football⚽and I'm also passionate about exploring geography🌏and nature
                        </p>
                        <div className="mt-8">
                            <a 
                                href="#" 
                                className="inline-block bg-transparent text-primary-500 border-2 border-primary-500 px-8 py-3 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-all duration-300"
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
                            <div 
                                key={index}
                                className="text-center p-6 bg-white rounded-xl shadow-devfolio hover:shadow-devfolio-hover transform hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4">{skill.icon}</div>
                                <h3 className="text-xl font-semibold text-darkBlue mb-2">{skill.title}</h3>
                                <p className="text-textLight text-sm">{skill.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;