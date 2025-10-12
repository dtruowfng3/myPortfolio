import React from 'react';
import githubIcon from '../assets/github.svg';
import linkedinIcon from '../assets/linkedin.svg';
import facebookIcon from '../assets/facebook.svg';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-4xl font-bold text-center mb-12 text-darkBlue relative">
                    Contact
                    <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-400 rounded-full"></div>
                </h2>
                
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-xl text-textLight mb-8 leading-relaxed">
                        Have a project in mind or want to work together? I'd love to hear from you.
                    </p>
                    
                    <div className="mt-8">
                        <a 
                            href="mailto:vduytruong3124@gmail.com" 
                            className="inline-block bg-transparent text-primary-500 border-2 border-primary-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-500 hover:text-white transition-all duration-300"
                        >
                            Get In Touch
                        </a>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex justify-center gap-4 mt-12">
                        {[
                            { icon: githubIcon, url: 'https://github.com/dtruowfng3', label: 'GitHub' },
                            { icon: linkedinIcon, url: 'https://www.linkedin.com/in/truong-vo-814922345/', label: 'LinkedIn' },
                            { icon: facebookIcon, url: 'https://www.facebook.com/d.truowfng.3/', label: 'Facebook' }
                        ].map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-devfolio hover:shadow-devfolio-hover hover:bg-primary-500 transform hover:-translate-y-1 transition-all duration-300 group"
                                aria-label={social.label}
                            >
                                <img 
                                    src={social.icon} 
                                    alt={social.label}
                                    className="w-6 h-6 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
                                />
                            </a>
                        ))}
                    </div>
                    
                    {/* Contact Info */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-darkBlue mb-3">📧 Email</h3>
                            <p className="text-textLight">vduytruong3124@gmail.com</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-darkBlue mb-3">📍 Location</h3>
                            <p className="text-textLight">Ho Chi Minh City, Vietnam</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;