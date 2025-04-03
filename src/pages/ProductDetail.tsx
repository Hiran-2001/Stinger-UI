import { useEffect, useState, useMemo, Suspense, lazy } from 'react';
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import Axios from '../utils/axios';
import { Minus, Plus } from 'lucide-react';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCartStore from '../store/useCartStore';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductImageCarousel = lazy(() => import('../components/ProductImageCarousel'));

function ProductDetail() {
  const [quantity, setQuantity] = useState<number>(1);
  const [productDetails, setProduct] = useState<any>()
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(false)
  const param = useParams();

  const { addToCart, isLoading } = useCartStore();

  const handleQuantityChange = (action: string) => {
    if (action === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  useEffect(() => {
    fetchProduct()
  }, [])

  const preloadImages = (urls: string[]) => {
    return Promise.all(
      urls.map((url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
        });
      })
    );
  };

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const product = await Axios.get(`/products/${param?.id}`);
      if (product?.data?.imageURLs?.length) {
        await preloadImages(product.data.imageURLs);
      }
      setProduct(product?.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }


  const handleAddToCart = async () => {
    const product = { id: productDetails?.id, size: selectedSize, color: selectedColor, quantity: quantity }
    await addToCart(product, quantity);
  };

  const memoizedProductDetails = useMemo(() => productDetails, [productDetails]);

  const ColorSkeleton = () => (
    <div className="flex gap-1">
      {Array(4).fill(0).map((_, index) => (
        <Skeleton key={index} circle height={32} width={32} />
      ))}
    </div>
  );

  const SizeSkeleton = () => (
    <div className="flex gap-2">
      {Array(4).fill(0).map((_, index) => (
        <Skeleton key={index} height={32} width={32} circle />
      ))}
    </div>
  );

  // Skeleton for quantity selector and add to cart button
  const ActionSkeleton = () => (
    <div className="flex gap-4">
      <Skeleton height={44} width={120} borderRadius="24px" />
      <Skeleton height={44} width={420} borderRadius="24px" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition duration-300">
      <div className="max-w-screen-xl mx-auto px-4 bg-white dark:bg-gray-900 transition duration-300">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          {loading ? (
            <Skeleton height={400} width="100%" borderRadius="8px" />
          ) : (
            <Suspense fallback={<Skeleton height={400} width="100%" borderRadius="8px" />}>
              <ProductImageCarousel images={memoizedProductDetails?.imageURLs || []} autoPlayInterval={4000} />
            </Suspense>
          )}

          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-black dark:text-gray-100">{loading ? <Skeleton width={200} height={30} /> : memoizedProductDetails?.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-black dark:text-gray-100">{loading ? <Skeleton width={100} height={30} /> : `₹ ${memoizedProductDetails?.price}`}</span>
            </div>


            <div>
              {loading ? (
                <>
                  <Skeleton count={1} height={15} />
                  <Skeleton width="60%" height={15} />
                </>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">{memoizedProductDetails?.description}</p>
              )}
            </div>
            <hr className="border-gray-200 dark:border-gray-700" />

            <div className="space-y-2">
              <span className="text-gray-700 dark:text-gray-300">
                {loading ? <Skeleton width={100} height={12} /> : "Select Colors"}
              </span>
              {loading ? (
                <ColorSkeleton />
              ) : (
                <div className="flex gap-2">
                  {memoizedProductDetails?.color?.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 ring-2 rounded-full ${selectedColor === color
                        ? 'ring-2 ring-offset-2 ring-black dark:ring-white'
                        : 'ring-gray-300 dark:ring-gray-600'
                        }`}
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}
                </div>
              )}
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            <div className="space-y-2">
              <span className="text-gray-700 dark:text-gray-300">
                {loading ? <Skeleton width={100} height={12} /> : "Choose Size"}
              </span>
              {loading ? (
                <SizeSkeleton />
              ) : (
                <div className="flex gap-2">
                  {memoizedProductDetails?.size?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-3xl ${selectedSize === size
                        ? 'bg-black dark:bg-gray-50 text-white dark:text-gray-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {
              loading ? (<ActionSkeleton />) : (
                <div className="flex gap-4">
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-3xl bg-gray-100 dark:bg-gray-700">                  <button
                    onClick={() => handleQuantityChange('decrement')}
                    className="p-2 text-gray-700 dark:text-gray-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                    <span className="px-4 py-2 text-gray-800 dark:text-gray-100">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange('increment')}
                      className="p-2 text-gray-700 dark:text-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={isLoading}
                    className="flex-1 bg-black dark:bg-gray-100 text-white dark:text-gray-900 py-2 px-4 rounded-3xl hover:bg-gray-800 dark:hover:bg-gray-600 flex justify-center items-center"                >
                    {isLoading ? <CircularProgress size="24px" /> : 'Add to Cart'}
                  </button>
                </div>
              )
            }

            {/* <div className="flex gap-4">
            <div className="flex items-center border rounded-3xl bg-gray-100">
              <button
                onClick={() => handleQuantityChange('decrement')}
                className="p-2"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={() => handleQuantityChange('increment')}
                className="p-2"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button onClick={handleAddToCart} disabled={isLoading} className="flex-1 bg-black text-white py-2 px-4 rounded-3xl hover:bg-gray-800">
              {loading ? <CircularProgress size="30px" /> : 'Add to Cart'}
            </button>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail