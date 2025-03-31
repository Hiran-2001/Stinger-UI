import React, { useEffect, useState, useMemo, Suspense, lazy } from 'react';
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

  return (
    <div className="max-w-screen-xl mx-auto px-4">
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

        {/* <ProductImageCarousel
          images={productDetails?.imageURLs || []}
          autoPlayInterval={3000}
        /> */}
        <Suspense fallback={<Skeleton height={400} width="100%" />}>
          <ProductImageCarousel images={memoizedProductDetails?.imageURLs || []} autoPlayInterval={3000} />
        </Suspense>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{loading ? <Skeleton width={200} height={30} /> : memoizedProductDetails?.name}</h1>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold">{loading ? <Skeleton width={100} height={30} /> : `₹ ${memoizedProductDetails?.price}`}</span>
          </div>


          <p className="text-gray-600">{loading ? <Skeleton count={3} /> : memoizedProductDetails?.description}</p>
          <hr />

          <div className="space-y-2">
            <span className="text-gray-700">Select Colors</span>
            <div className="flex gap-2">
              {memoizedProductDetails?.color?.map((color: any) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full ${selectedColor === color ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                  style={{ backgroundColor: color }}
                ></button>
              ))}
            </div>
          </div>

          <hr />


          <div className="space-y-2">
            <span className="text-gray-700">Choose Size</span>
            <div className="flex gap-2">
              {productDetails?.size.map((size: any) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-3xl ${selectedSize === size
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <hr />

          {/* Quantity and Add to Cart */}
          <div className="flex gap-4">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail