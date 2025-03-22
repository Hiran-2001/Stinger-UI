import { useEffect, useState } from "react";
import Axios from "../utils/axios";
import { Link } from "react-router-dom";


function CategoryNav() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategory()
  }, [])

  const fetchCategory = async () => {
    try {
      const cachedCategory: any = localStorage.getItem('cachedCategory');
      if (cachedCategory) {
        setCategories(JSON.parse(cachedCategory));
        return;
      }
      const categoryResponse: any = await Axios.get('/category');
      if (categoryResponse) {
        localStorage.setItem('cachedCategory', JSON.stringify(categoryResponse?.data?.categories));
        setCategories(categoryResponse?.data?.categories);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }

  }
  return (
    <div className="w-full bg-white text-black py-3">
      <div className="max-w-6xl mx-auto flex justify-center space-x-8">
        {categories.map((category: any, i: any) => {

          return (
            <Link key={i} className="px-4 py-2 hover:bg-white hover:text-black transition-colors" to={`/shop/${category?.name}`}>
              <button
                key={category?.id}
              ></button>
              {category?.name}
            </Link>

          )
        })}
      </div>
    </div>
  );
}

export default CategoryNav