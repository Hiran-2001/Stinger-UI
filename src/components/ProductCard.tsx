import { Link } from "react-router-dom";
import star from "../assets/review-star.png"

export const ProductCard = ({ product }: any) => {

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;


  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <Link to={`/shop/product/${product?.id}`}>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex items-center justify-center h-56 sm:h-64 md:h-72">
          <img
            src={product?.imageURLs[0]}
            alt={product?.name}
            className="w-auto h-full max-h-48 sm:max-h-56 md:max-h-64 object-contain mx-auto"
          />
        </div>

        <div className="mt-3">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold">
            {product.name}</h3>

          <div className="flex items-center text-yellow-500 mt-1">
            {[...Array(5)].map((_, index) => (
              <img className="max-h-4 max-w-4" src={star} key={index} />
            ))}
           <span className="text-gray-600 dark:text-gray-400 ml-2 text-xs sm:text-sm">{product.rating}/5</span>
          </div>

          <div className="flex items-center mt-2 space-x-2">
          <p className="text-sm sm:text-lg font-semibold text-black dark:text-white">₹ {product.price}</p>
            {product.originalPrice && (
              <>
                <p className="text-gray-500 dark:text-gray-400 line-through text-xs sm:text-base">₹{product.originalPrice}</p>
                <p className="text-red-500 text-xs sm:text-sm font-medium">-{discountPercentage}%</p>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );


};
