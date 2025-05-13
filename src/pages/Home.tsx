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
  const [search, setSearch] = useState('');
  const [cartItem, setCartItem] = useState([])

  const fetchChatbase=async()=>{
    const response = await fetch('https://www.chatbase.co/api/v1/chat', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer rtil6j77r9no9gjdzxi63fiqlyyppbl5',
      },
      body: JSON.stringify({
        messages: [
          {content: 'How can I help you?', role: 'assistant'},
          {content: 'What is chatbase?', role: 'user'},
        ],
        chatbotId: 'Gq2ryLPTe_izcYgRlFxbO',
        stream: false,
        model: 'gpt-4o-mini',
        temperature: 0,
      }),
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw Error(errorData.message)
    }
    const data = await response.json()
    console.log(data) // { "text": "..."}
  }

  useEffect(() => {
    fetchProducts();
    fetchChatbase()
  }, [])

  const fetchProducts = async () => {
    try {
      const cachedProducts: any = localStorage.getItem('cachedProducts');
      if (cachedProducts) {
        setProductList(JSON.parse(cachedProducts));
        return;
      }
      const categoryResponse: any = await Axios.get(`/products?search=${search}&page=1&limit=10`);
      if (categoryResponse) {
        localStorage.setItem('cachedProducts', JSON.stringify(categoryResponse?.data?.products)); // ✅ Convert to JSON
        setProductList(categoryResponse?.data?.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }

  }


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition duration-300">
      <div className="max-w-screen-xl mx-auto">
        <Header />
        <CategoryNav />
        <ProductCarousel />
        <ProductGrid products={productList} />
        <BrowseByStyle />
        <div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home