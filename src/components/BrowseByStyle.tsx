import React from 'react';
import casualWear from "../assets/causal-image.jpg"
import formalWear from "../assets/formal-image.jpg"
import vacationWear from "../assets/vacation-image.jpg"
import gymWear from "../assets//gym-wear.jpg"
const BrowseByStyle = () => {
    const styles = [
        {
            id: 1,
            name: 'Casual',
            image: casualWear,
            size: 'full'
        },
        {
            id: 2,
            name: 'Formal',
            image: formalWear,
            size: 64
        },
        {
            id: 3,
            name: 'Vaction',
            image: vacationWear,
            size: 64
        },
        {
            id: 4,
            name: 'Gym',
            image: gymWear,
            size: 'full'
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-10 py-16 dark:bg-gray-900">
            <div className="bg-gray-100 dark:bg-gray-800 h-4/6 rounded-3xl p-8 transition duration-300">
                <h2 className="text-3xl font-black mb-8 dark:text-white">BROWSE BY DRESS STYLE</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {styles.map((style) => (
                        <a
                            key={style.id}
                            className="relative bg-white dark:bg-gray-700 h-60 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="aspect-[4/3] relative">
                                <img
                                    src={style.image}
                                    alt={`${style.name} style`}
                                    className="w-52 h-full object-cover"
                                />
                                <div className="absolute right-6 top-6">
                                    <h3 className="text-2xl font-bold dark:text-white">{style.name}</h3>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>  
            </div>
        </section>
    );
};

export default BrowseByStyle;