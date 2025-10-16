import React, { useState } from 'react';

const MyWorlds: React.FC = () => {
    const [activeStory, setActiveStory] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const stories = [
        {
            id: 0,
            title: "Just, I really love Football",
            date: "2024",
            category: "Sports",
            image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500&h=300&fit=crop",
            content: "Football has been my passion since childhood. I started playing when I was 8 years old and it has taught me valuable lessons about teamwork, perseverance, and leadership. Whether it's playing with friends on weekends or watching professional matches, football brings me joy and helps me stay active and healthy.",
            highlights: ["Started playing at age 8", "Team captain in primmary school", "Favorite team: Barcelona"]
        },
        {
            id: 1,
            title: "Exploring Geography & Nature 🌏",
            date: "2023-2024",
            category: "Travel & Nature",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
            content: "I have a deep fascination with geography and nature. I love studying different countries, their cultures, landscapes, and natural phenomena. This passion has led me to explore various places and learn about different ecosystems. It's amazing how diverse our planet is!",
            highlights: ["Visited 15+ countries", "Love hiking and nature photography", "Studying world cultures", "Dream destination: Iceland"]
        },
        {
            id: 2,
            title: "Cooking Adventures 👨‍🍳",
            date: "2024",
            category: "Lifestyle",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop",
            content: "During the pandemic, I discovered my love for cooking. It started as a necessity but quickly became a creative outlet. I enjoy experimenting with different cuisines, especially Vietnamese and international dishes. Cooking has taught me patience and attention to detail.",
            highlights: ["Learned during pandemic", "Specialty: Vietnamese cuisine", "Love experimenting with flavors", "Cooking for family and friends"]
        },
        {
            id: 3,
            title: "Photography Hobby 📸",
            date: "2023-2024",
            category: "Creative",
            image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=300&fit=crop",
            content: "Photography allows me to capture moments and tell stories through images. I particularly enjoy landscape and street photography. It's a way for me to see the world differently and appreciate the beauty in everyday moments.",
            highlights: ["Landscape photography", "Street photography", "Learning composition", "Instagram: @myphotography"]
        }
    ];

    const categories = Array.from(new Set(stories.map(story => story.category)));
    
    // Filter stories based on selected category
    const filteredStories = selectedCategory 
        ? stories.filter(story => story.category === selectedCategory)
        : stories;
    
    // Get current story to display
    const currentStory = filteredStories[activeStory] || stories[0];

    return (
        <section id="my-worlds" className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-4xl font-bold text-center mb-12 text-darkBlue relative">
                    My Worlds
                    <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-400 rounded-full"></div>
                </h2>
                
                <p className="text-lg text-textLight text-center mb-12 max-w-3xl mx-auto">
                    Beyond programming, here are some stories and passions that make up my world. 
                    These are the experiences and interests that shape who I am outside of code.
                </p>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button
                        onClick={() => {
                            setSelectedCategory(null);
                            setActiveStory(0);
                        }}
                        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                            selectedCategory === null 
                                ? 'bg-primary-500 text-white shadow-lg' 
                                : 'bg-white text-primary-500 border-2 border-primary-500 hover:bg-primary-500 hover:text-white'
                        }`}
                    >
                        All Stories
                    </button>
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setSelectedCategory(category);
                                setActiveStory(0);
                            }}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                                selectedCategory === category 
                                    ? 'bg-primary-500 text-white shadow-lg' 
                                    : 'bg-white text-primary-500 border-2 border-primary-500 hover:bg-primary-500 hover:text-white'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Story Display */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Story Content */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="bg-primary-100 text-primary-500 px-3 py-1 rounded-full text-sm font-medium">
                                    {currentStory.category}
                                </span>
                                <span className="text-textLight text-sm">
                                    {currentStory.date}
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-darkBlue">
                                {currentStory.title}
                            </h3>
                            <p className="text-lg text-textLight leading-relaxed">
                                {currentStory.content}
                            </p>
                        </div>

                        {/* Story Highlights */}
                        <div className="bg-white p-6 rounded-xl shadow-devfolio">
                            <h4 className="text-xl font-semibold text-darkBlue mb-4">Key Highlights</h4>
                            <ul className="space-y-2">
                                {currentStory.highlights.map((highlight, index) => (
                                    <li key={index} className="flex items-center gap-3 text-textLight">
                                        <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Story Image */}
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-xl shadow-devfolio hover:shadow-devfolio-hover transform hover:-translate-y-2 transition-all duration-300">
                            <img
                                src={currentStory.image}
                                alt={currentStory.title}
                                className="w-full h-80 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h4 className="text-xl font-semibold">{currentStory.title}</h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Story Navigation */}
                <div className="flex justify-center mt-12">
                    <div className="flex gap-2">
                        {filteredStories.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveStory(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    activeStory === index 
                                        ? 'bg-primary-500 scale-125' 
                                        : 'bg-gray-300 hover:bg-primary-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default MyWorlds;
