import { useEffect, useState } from 'react'
import Axios from '../utils/axios'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';
import CategoryNav from '../components/CategoryNav';
import { ProductGrid } from '../components/ProductGrid';
import FilterSection from '../components/FilterSection';
import useProductStore from '../store/useProductStore';

function ProductPage() {
  const params = useParams();
  const [categoryProducts, setCategoryProducts] = useState([])
  const [showFilters,setShowFilters] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({ price: [50, 5000], color: null, size: null });
  const search = useProductStore(state => state.productSearch);
    
  useEffect(() => {
      fetchProduct();
  }, [search, params?.category, filters]);


  const fetchProduct = async () => {
    try {
      const { price, color, size } = filters;

      let query = `/products?search=${search}&limit=20&category=${params?.category}`;
      if (price) query += `&minPrice=${price[0]}&maxPrice=${price[1]}`;
      // if (color) query += `&color=${color}`;
      // if (size) query += `&size=${size}`;
      const product = await Axios.get(query);
      setCategoryProducts(product?.data?.products);
      setError(null)
    } catch (error: any) {
      setError(error?.response?.data?.message)
    }
  }
  
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <Header />
      <CategoryNav />
  
      {/* Responsive Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Sidebar for Larger Screens */}
        <div className="hidden lg:block lg:w-72 sticky top-6 h-screen">
          <FilterSection onFilterChange={setFilters} />
        </div>
  
        {/* Mobile Filter Button */}
        <div className="lg:hidden">
          <button
            className="w-full bg-gray-900 text-white py-2 rounded-md font-medium"
            onClick={() => setShowFilters(true)}
          >
            Filters
          </button>
        </div>
  
        {/* Product Grid */}
        <div className="flex-1">
          {error ? (
            <div className="h-full flex justify-center items-center">{error}</div>
          ) : (
            <ProductGrid products={categoryProducts} />
          )}
        </div>
      </div>
  
      {/* Mobile Sidebar (Modal) */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
          <div className="bg-white w-72 h-full shadow-lg p-5">
            <button
              className="mb-4 text-gray-700 hover:text-black"
              onClick={() => setShowFilters(false)}
            >
              Close ✖
            </button>
            <FilterSection onFilterChange={setFilters} />
          </div>
        </div>
      )}
    </div>
  );
  
}

export default ProductPage