import { Search } from 'lucide-react'
import useProductStore from '../store/useProductStore';

function SearchBar() {
    const { setProductSearch, productSearch } = useProductStore();

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <div className="relative">
                <input
                     onChange={(e) => setProductSearch(e.target.value)}
                    type="text"
                    value={productSearch}
                    placeholder="Search products..."
                    className="w-full px-6 py-3 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-black"
                />
                <Search className="absolute right-4 top-3.5 text-gray-500" size={20} />
            </div>
        </div>
    )
}

export default SearchBar