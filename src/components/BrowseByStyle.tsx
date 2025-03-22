import React from 'react';

const BrowseByStyle = () => {
    const styles = [
        {
            id: 1,
            name: 'Casual',
            image: '/api/placeholder/600/400',
            size: 'full'
        },
        {
            id: 2,
            name: 'Formal',
            image: '/api/placeholder/600/400',
            size: 64
        },
        {
            id: 3,
            name: 'Party',
            image: '/api/placeholder/600/400',
            size: 64
        },
        {
            id: 4,
            name: 'Gym',
            image: '/api/placeholder/600/400',
            size: 'full'
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-10 py-16">
            <div className="bg-gray-100 h-4/6 rounded-3xl p-8">
                <h2 className="text-3xl font-black mb-8">BROWSE BY DRESS STYLE</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {styles.map((style) => (
                        <a
                            key={style.id}
                            className={`relative bg-white h-60  rounded-2xl overflow-hidden hover:shadow-lg transition-shadow`}
                        >
                            <div className="aspect-[4/3] relative">
                                <img
                                    src={style.image}
                                    alt={`${style.name} style`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute left-6 top-6">
                                    <h3 className="text-2xl font-bold">{style.name}</h3>
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