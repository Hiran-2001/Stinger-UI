import { Slider } from '@mui/material';
import { Check, ChevronDown, ChevronRight, ChevronUp, SlidersHorizontal } from 'lucide-react';
import React, { useState } from 'react'

const colors = ["#00ff00", "#ff0000", "#ff6600", "#ffcc00", "#0000ff", "#ff00ff", "#ffffff", "#000000"];
const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];
const dressStyles = ["Casual", "Formal", "Party", "Gym"];

function FilterSection({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
    const [priceRange, setPriceRange] = useState<number[]>([50, 5000]);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

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
        <div className="w-72 bg-white border border-gray-300 rounded-2xl p-5 shadow-md h-full">
            <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Filters</h3>
            <SlidersHorizontal />
            </div>



            {/* Price Range */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">Price</h4>
                <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    min={0}
                    max={10000}
                    valueLabelDisplay="auto"
                    sx={{ color: "black" }}
                />
                <p className="text-sm text-gray-700 mt-1">₹{priceRange[0]} - ₹{priceRange[1]}</p>
            </div>

            {/* Colors */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">Colors</h4>
                <div className="grid grid-cols-5 gap-2">
                    {colors.map((color) => (
                        <div
                            key={color}
                            className={`w-6 h-6 rounded-full border-2 cursor-pointer ${selectedColor === color ? "border-black" : "border-gray-300"}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedColor(color)}
                        />
                    ))}
                </div>
            </div>

            {/* Size */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">Size</h4>
                <div className="grid grid-cols-3 gap-3">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            className={`text-sm font-medium border-none rounded-3xl  px-4 py-2 transition-all ${selectedSize === size ? "bg-black text-white border-black" : "bg-gray-100 text-gray-700 border-gray-300"
                                }`}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dress Style */}
            <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-2">Dress Style</h4>
                <div className="space-y-3">
                    {dressStyles.map((style) => (
                        <div key={style} className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-black">
                            <span>{style}</span>
                            <ChevronRight size={16} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Apply Button */}
            <button onClick={applyFilters} className="w-full bg-black text-white py-3 rounded-lg font-semibold text-sm hover:bg-gray-900 transition">
                Apply Filter
            </button>
        </div>
    );
};

export default FilterSection