import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import DiscountBanner from "../assets/Banner/Discount-Banner.jpg"
import MenCollection from "../assets/Banner/Men-Collection.jpg"
import NewArrival from "../assets/Banner/New-Arrivals-Banner.jpg"

export const ProductCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const items = [
    { id: 1, name: 'Summer Discount', image: DiscountBanner },
    { id: 2, name: `Men's Collection`, image: MenCollection },
    { id: 3, name: 'New Arrivals', image: NewArrival }
  ];

  const nextSlide = () => setCurrentSlide((prev: any) => (prev + 1) % items.length);
  const prevSlide = () => setCurrentSlide((prev: any) => (prev - 1 + items.length) % items.length);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[550px] mx-auto my-0 bg-black dark:bg-gray-900 transition duration-300">
      <div className="overflow-hidden relative h-full">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute w-full h-full transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-gray-900 dark:bg-opacity-50 flex items-center justify-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white dark:text-gray-100 text-center px-4">
                {item.name}
              </h2>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 p-1 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <ChevronLeft size={16} className="sm:hidden text-black dark:text-gray-300" />
          <ChevronLeft size={24} className="hidden sm:block text-black dark:text-gray-300" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 p-1 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <ChevronRight size={16} className="sm:hidden text-black dark:text-gray-300" />
          <ChevronRight size={24} className="hidden sm:block text-black dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};