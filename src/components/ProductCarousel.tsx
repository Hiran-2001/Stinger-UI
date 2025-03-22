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
      { id: 3, name: 'New Arrivals', image: NewArrival}
    ];
  
    const nextSlide = () => setCurrentSlide((prev:any) => (prev + 1) % items.length);
    const prevSlide = () => setCurrentSlide((prev:any) => (prev - 1 + items.length) % items.length);
  
    return (
      <div className="relative max-w-full h-[550px]  mx-auto my-0 bg-black">
        <div className="overflow-hidden relative h-full">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`absolute w-full h-full transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white">{item.name}</h2>
              </div>
            </div>
          ))}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    );
  };