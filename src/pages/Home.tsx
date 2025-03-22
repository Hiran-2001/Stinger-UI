import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import CategoryNav from '../components/CategoryNav';
import { ProductCarousel } from '../components/ProductCarousel';
import { ProductGrid } from '../components/ProductGrid';
import Footer from '../components/Footer';
import Header from '../components/Header';
import BrowseByStyle from '../components/BrowseByStyle';
import Axios from '../utils/axios';

function Home() {
  const navigate = useNavigate()
  const [productList, setProductList] = useState([]);
  const [search,setSearch] = useState('');
  const [cartItem,setCartItem] = useState([])
  
    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        try {
            const cachedProducts: any = localStorage.getItem('cachedProducts');
            if (cachedProducts) {              
                setProductList(JSON.parse(cachedProducts));
                return;
            }
            const categoryResponse: any = await Axios.get(`/products?search=${search}&page=1&limit=20`);
            console.log(categoryResponse,"categoryRes");
            
            if (categoryResponse) {
                localStorage.setItem('cachedProducts', JSON.stringify(categoryResponse?.data?.products)); // ✅ Convert to JSON
                setProductList(categoryResponse?.data?.products);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }

    }

  
  return (
    <div className="max-w-screen-xl mx-auto">
      <Header/>
      <CategoryNav />
      <ProductCarousel/>
      <ProductGrid products={productList} />
      <BrowseByStyle/>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Home