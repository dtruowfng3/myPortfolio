import React from 'react';
// import portfolioImage from '../../assets/my_porfolio.png';
// import portfolioGif from '../../assets/my_portfolio_2.gif';
import portfolioGif from '../../assets/my_portfolio_v3.gif';
import placeholderImage from '../../assets/image_placeholder.png';
import ExternalLinkIcon from '../ui/ExternalLinkIcon';

const Projects: React.FC = () => {
    const projects = [
        {
            title: "Simple Portfolio",
            description: "The very portfolio you're viewing, built to showcase my projects using React and TypeScript.",
            image: portfolioGif,
            liveUrl: "#",
            sourceUrl: "https://github.com/dtruowfng3/myPortfolio",
            tags: ["TypeScript", "React", "TailwindCSS"]
        },
        {
            title: "Project Title 2",
            description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi neque, ipsa animi maiores repellendus distinctio aperiam earum dolor voluptatum consequatur blanditiis inventore debitis fuga numquam voluptate architecto itaque molestiae.",
            image: placeholderImage,
            liveUrl: "#",
            sourceUrl: "#",
            tags: ["Placeholder", "Placeholder", "Placeholder"]
        },
        {
            title: "Project Title 3",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi neque, ipsa animi maiores repellendus distinctio aperiam earum dolor voluptatum consequatur blanditiis inventore debitis fuga numquam voluptate architecto itaque molestiae.",
            image: placeholderImage, 
            liveUrl: "#",
            sourceUrl: "#",
            tags: ["Placeholder", "Placeholder", "Placeholder"]
        }
    ];

    return (
        <section id="projects" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-4xl font-bold text-center mb-12 text-darkBlue relative">
                    Projects
                    <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-400 rounded-full"></div>
                </h2>
                
                <div className="space-y-16">
                    {projects.map((project, index) => (
                        <div 
                            key={index}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                            }`}
                        >
                            {/* Project Text */}
                            <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                                <h3 className="text-3xl font-bold text-darkBlue">{project.title}</h3>
                                <p className="text-lg text-textLight leading-relaxed">
                                    {project.description}
                                </p>
                                
                                {/* Project Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span 
                                            key={tagIndex}
                                            className="bg-primary-100 text-primary-500 px-3 py-1 rounded-full text-sm font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                
                                {/* Project Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-400 transition-colors duration-300"
                                    >
                                        See Live
                                    </a>
                                    <a 
                                        href={project.sourceUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="group/source-btn relative inline-flex items-center justify-center bg-transparent text-primary-500 border-2 border-primary-500 px-6 py-3 rounded-lg font-semibold hover:text-white transition-all duration-500 hover:shadow-md hover:shadow-primary-500/20 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary-500 before:to-primary-600 before:-translate-x-full before:transition-transform before:duration-500 hover:before:translate-x-0"
                                    >
                                        <span className="relative z-10 transition-opacity duration-300 group-hover/source-btn:opacity-0">Source Code</span>
                                        <ExternalLinkIcon 
                                            className="absolute w-5 h-5 text-white transition-opacity duration-300 opacity-0 group-hover/source-btn:opacity-100 z-20"
                                        />
                                    </a>
                                </div>
                            </div>
                            
                            {/* Project Image */}
                            <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                                <a 
                                    href={project.liveUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block group"
                                >
                                    <div className="relative overflow-hidden rounded-xl shadow-devfolio hover:shadow-devfolio-hover transform hover:-translate-y-2 transition-all duration-300">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/75 to-slate-800/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <span className="text-white text-xl font-semibold">View Project</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;