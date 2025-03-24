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
    <div className="max-w-screen-xl mx-auto">
      <Header />
      <CategoryNav />
      <div className="flex gap-6">
        <div className="w-72 h-screen sticky top-6">
          <FilterSection onFilterChange={setFilters} />
        </div>
        <div className="flex-1">
          {error ? <div className='h-full flex justify-center items-center'>{error}</div> : <ProductGrid products={categoryProducts} />}
        </div>
      </div>
    </div>
  )
}

export default ProductPage