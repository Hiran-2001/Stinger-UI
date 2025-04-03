import { Slider } from '@mui/material';
import { Check, ChevronDown, ChevronRight, ChevronUp, SlidersHorizontal } from 'lucide-react';
import React, { useState } from 'react'

const colors = ["#00ff00", "#ff0000", "#ff6600", "#ffcc00", "#0000ff", "#ff00ff", "#ffffff", "#000000"];
const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];
const dressStyles = ["Casual", "Formal", "Party", "Gym"];

function FilterSection({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
  const [priceRange, setPriceRange] = useState<number[]>([100, 2000]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const theme = localStorage.getItem("theme")

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const applyFilters = () => {
    const filters = {
      price: priceRange,
      color: selectedColor,
      size: selectedSize,
    };
    onFilterChange(filters);  // 🔥 Pass filters up to parent component
  };
  return (
    <div className="w-full lg:w-72 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl p-5 shadow-md transition duration-300">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Filters</h3>
        <SlidersHorizontal className='dark:text-gray-100' />
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Price</h4>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          min={0}
          max={20000}
          valueLabelDisplay="auto"
          sx={{
            color: "black",
            ...(theme === 'dark' && { color: "white" })
          }}
        />
        <p className="text-sm text-gray-700 dark:text-gray-400 mt-1">₹{priceRange[0]} - ₹{priceRange[1]}</p>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Colors</h4>
        <div className="grid grid-cols-5 gap-2">
          {colors.map((color) => (
            <div
              key={color}
              className={`w-6 h-6 rounded-full border-2 cursor-pointer ${selectedColor === color
                  ? "border-black dark:border-white"
                  : "border-gray-300 dark:border-gray-600"
                }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Size</h4>
        <div className="grid grid-cols-3 gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              className={`text-sm font-medium rounded-3xl px-4 py-2 transition-all ${selectedSize === size
                  ? 'bg-black dark:bg-gray-50 text-white dark:text-gray-700'
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400"
                }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Dress Style */}
      {/* <div className="mb-6">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Dress Style</h4>
            <div className="space-y-3">
              {dressStyles.map((style) => (
                <div key={style} className="flex items-center justify-between text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-gray-100">
                  <span>{style}</span>
                  <ChevronRight size={16} className="text-gray-700 dark:text-gray-300" />
                </div>
              ))}
            </div>
          </div> */}

      {/* Apply Button */}
      <button
        onClick={applyFilters}
        className="w-full bg-black dark:bg-gray-100 text-white dark:text-gray-900 py-3 rounded-lg font-semibold text-sm hover:bg-gray-900 dark:hover:bg-gray-600 transition"      >
        Apply Filter
      </button>
    </div>
  );

};

export default FilterSection