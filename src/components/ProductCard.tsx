import { Link } from "react-router-dom";
import star from "../assets/review-star.png"

export const ProductCard = ({ product }: any) => {
  
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
    

  return (
    <div className="bg-white p-4">
      <Link to={`/shop/product/${product?.id}`}>

        <div className="bg-gray-100 rounded-lg h-96 p-2">
          <img
            src={product?.imageURLs[0]}
            alt={product?.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="mt-3">
          <h3 className="text-lg font-semibold">{product.name}</h3>

          <div className="flex items-center text-yellow-500 mt-1">
            {[...Array(5)].map((_, index) =>
              index < Math.round(product.rating) ? (
                <img className="max-h-4 max-w-4" src={star} key={index} />
              ) : (
                <img className="max-h-4 max-w-4" src={star} key={index} />
              )
            )}
            <span className="text-gray-600 ml-2 text-sm">{product.rating}/5</span>
          </div>

          <div className="flex items-center mt-2 space-x-2">
            <p className="text-xl font-semibold text-black">₹ {product.price}</p>
            {product.price && (
              <>
                <p className="text-gray-500 line-through">₹{product.originalPrice}</p>
                <p className="text-red-500 text-sm font-medium">-{discountPercentage}%</p>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
