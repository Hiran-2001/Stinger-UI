import { useState, useEffect } from 'react';

const ProductImageCarousel = ({ images, autoPlayInterval = 3000 }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Auto-shuffle images
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [images.length, autoPlayInterval]);
  
  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-20 h-20 border rounded-lg overflow-hidden ${
              selectedImage === index ? 'border-black' : 'border-gray-200'
            }`}
          >
            <img
              src={img}
              alt={`Product thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      
      {/* Main Image */}
      <div className="flex-1 bg-gray-800 rounded-lg">
        <img 
          src={images[selectedImage]}
          alt="Product view"
          className="w-full h-full object-fit"
        />
      </div>
    </div>
  );
};

export default ProductImageCarousel;