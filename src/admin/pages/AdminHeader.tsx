import { ChevronDown, Search } from 'lucide-react'

function AdminHeader() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-medium">OverView</span>

            <div className="relative">
              <Search  className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm w-64"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <span className="text-xs bg-gray-300 rounded px-1">K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="border border-gray-200 rounded-lg px-3 py-2 flex items-center">
              <span className="mr-2 text-sm">Feb</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>

            <div className="border border-gray-200 rounded-lg px-3 py-2 flex items-center">
              <span className="mr-2 text-sm">Sales</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                <img src="/api/placeholder/32/32" alt="User" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-sm font-medium">Kamisato Aya</div>
                <div className="text-xs text-gray-500">Manager</div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default AdminHeader