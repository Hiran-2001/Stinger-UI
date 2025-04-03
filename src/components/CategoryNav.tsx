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
    <div className="w-full bg-white dark:bg-gray-900 text-black dark:text-white py-3">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category: any, i: any) => (
            <Link
              key={i}
              className="px-3 py-2 text-sm sm:text-base sm:px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              to={`/shop/${category?.name}`}
            >
              <button key={category?.id}></button>
              {category?.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryNav