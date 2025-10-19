import React from 'react';
import ThreeDCarousel from '../ui/ThreeDCarousel';

const MyWorlds: React.FC = () => {
    const stories = [
        {
            id: 0,
            title: "Just, I really love Football",
            date: "2024",
            category: "Sports",
            content: "Football has been my passion since childhood. I started playing when I was 8 years old and it has taught me valuable lessons about teamwork, perseverance, and leadership."
        },
        {
            id: 1,
            title: "Exploring Geography & Nature 🌏",
            date: "2023-2024",
            category: "Travel & Nature",
            content: "I have a deep fascination with geography and nature. I love studying different countries, their cultures, landscapes, and natural phenomena."
        },
        {
            id: 2,
            title: "Cooking Adventures 👨‍🍳",
            date: "2024",
            category: "Lifestyle",
            content: "During the pandemic, I discovered my love for cooking. It started as a necessity but quickly became a creative outlet."
        }
    ];

    return (
        <section id="my-worlds" className="py-20 bg-slate-950">
            <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-br from-cyan-300 via-blue-300 to-purple-300 py-4 bg-clip-text text-transparent relative">
                    My Worlds
                </h2>
                
                {/* 3D Carousel */}
                <div className="h-96 mb-12">
                    <ThreeDCarousel />
                </div>

                {/* Stories Text Content - Centered below carousel */}
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {stories.map((story, index) => (
                        <div key={story.id} className="space-y-4">
                            <div className="flex items-center justify-center gap-4">
                                <span className="bg-gradient-to-br from-cyan-900/20 via-blue-900/30 to-purple-900/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                                    {story.category}
                                </span>
                                <span className="text-slate-400 text-sm">
                                    {story.date}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-100">
                                {story.title}
                            </h3>
                            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                                {story.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MyWorlds;
