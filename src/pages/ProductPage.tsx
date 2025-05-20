import { useEffect, useState } from 'react'
import Axios from '../utils/axios'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';
import CategoryNav from '../components/CategoryNav';
import { ProductGrid } from '../components/ProductGrid';
import FilterSection from '../components/FilterSection';
import useProductStore from '../store/useProductStore';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ProductPage() {
  const params = useParams();
  const [categoryProducts, setCategoryProducts] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ price: [100, 15000], color: null, size: null });
  const search = useProductStore(state => state.productSearch);

  useEffect(() => {
    fetchProduct();
  }, [search, params?.category, filters]);


  const fetchProduct = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false)
    }
  }

  const FilterSectionSkeleton = () => (
    <div className="space-y-6">
      <div>
        <Skeleton height={24} width={120} className="mb-3" />
        <Skeleton height={60} width="100%" borderRadius="8px" />
      </div>
      <div>
        <Skeleton height={24} width={100} className="mb-3" />
        <div className="flex flex-wrap gap-2">
          {Array(6).fill(0).map((_, index) => (
            <Skeleton key={index} height={32} width={32} circle />
          ))}
        </div>
      </div>
      <div>
        <Skeleton height={24} width={100} className="mb-3" />
        <div className="flex flex-wrap gap-2">
          {Array(4).fill(0).map((_, index) => (
            <Skeleton key={index} height={36} width={60} borderRadius="24px" />
          ))}
        </div>
      </div>
    </div>
  );

  const ProductGridSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array(8).fill(0).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton height={200} borderRadius="8px" />
          <Skeleton height={20} width="70%" />
          <Skeleton height={16} width="40%" />
          <Skeleton height={16} width="30%" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition duration-300">
      <div className="max-w-screen-xl mx-auto px-4">
        <Header />
        <CategoryNav />

        {/* Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar for Larger Screens */}
          <div className="hidden lg:block lg:w-72 sticky top-6 h-screen">
            {
              loading ? (<FilterSectionSkeleton />) : (<FilterSection onFilterChange={setFilters} />)
            }

          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <button
              className="w-full bg-gray-900 text-white dark:bg-gray-100 dark:text-black py-2 rounded-md font-medium"
              onClick={() => setShowFilters(true)}
            >
              Filters
            </button>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {error ? (
              <div className="h-full flex justify-center items-center dark:text-gray-100">{error}</div>
            ) : loading ? (
              <ProductGridSkeleton />
            ) : (<ProductGrid products={categoryProducts} />
            )}
          </div>
        </div>

        {/* Mobile Sidebar (Modal) */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50 dark:bg-gray-900">
            <div className="bg-white w-72 h-full shadow-lg p-5 dark:bg-gray-900 dark:shadow-white" >
              <button
                className="mb-4 text-gray-700 hover:text-black dark:bg-gray-900 dark:text-white"
                onClick={() => setShowFilters(false)}
              >
                ✖
              </button>
              {loading ? (
                <FilterSectionSkeleton />
              ) : (
                <FilterSection onFilterChange={setFilters} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

}

export default ProductPage