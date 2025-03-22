import { useState } from 'react';
import { Search, ChevronDown, Download, Filter } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const SalesPage = () => {
    const [period, setPeriod] = useState('This Week');
    const [status, setStatus] = useState('All');

    // Sample sales data
    const salesData = [
        { id: '#INV-001', customer: 'John Smith', date: '13 Mar 2025', amount: '$189.99', status: 'Completed' },
        { id: '#INV-002', customer: 'Emily Johnson', date: '12 Mar 2025', amount: '$259.75', status: 'Pending' },
        { id: '#INV-003', customer: 'Michael Brown', date: '11 Mar 2025', amount: '$142.50', status: 'Completed' },
        { id: '#INV-004', customer: 'Sarah Davis', date: '10 Mar 2025', amount: '$329.99', status: 'Cancelled' },
        { id: '#INV-005', customer: 'David Wilson', date: '09 Mar 2025', amount: '$89.99', status: 'Completed' },
        { id: '#INV-006', customer: 'Jennifer Lee', date: '08 Mar 2025', amount: '$219.50', status: 'Pending' },
    ];

    // Status color mapping
    const getStatusColor = (status: any) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className=" flex">
            <div>
                <AdminSidebar />
            </div>

            <div className=' flex-1 m-5'>
                <div className="flex items-center justify-between mb-6 ">
                    <h1 className="text-xl font-medium">Sales Overview</h1>
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg">
                            <Download className="w-4 h-4 mr-2" />
                            <span>Export</span>
                        </button>
                    </div>
                </div>

                {/* Sales summary cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">Total Sales</p>
                        <h3 className="text-xl font-semibold mt-1">$12,345.67</h3>
                        <p className="text-xs text-green-500 mt-1">+12.5% from last week</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">Orders</p>
                        <h3 className="text-xl font-semibold mt-1">124</h3>
                        <p className="text-xs text-green-500 mt-1">+8.2% from last week</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">Customers</p>
                        <h3 className="text-xl font-semibold mt-1">87</h3>
                        <p className="text-xs text-green-500 mt-1">+5.7% from last week</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">Avg. Order Value</p>
                        <h3 className="text-xl font-semibold mt-1">$99.56</h3>
                        <p className="text-xs text-red-500 mt-1">-2.3% from last week</p>
                    </div>
                </div>

                {/* Sales table */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="font-medium">Recent Sales</h2>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search orders..."
                                    className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-sm w-64"
                                />
                            </div>
                            <div className="border border-gray-200 rounded-lg flex items-center">
                                <button className="px-3 py-2 flex items-center">
                                    <span className="mr-2 text-sm">{period}</span>
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                            <div className="border border-gray-200 rounded-lg flex items-center">
                                <button className="px-3 py-2 flex items-center">
                                    <Filter className="w-4 h-4 mr-2 text-gray-500" />
                                    <span className="text-sm">{status}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {salesData.map((sale) => (
                                    <tr key={sale.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.id}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{sale.customer}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{sale.date}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">{sale.amount}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(sale.status)}`}>
                                                {sale.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                                            <button className="text-blue-600 hover:text-blue-800">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Showing 1 to 6 of 50 entries
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm" disabled>Previous</button>
                            <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">1</button>
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">2</button>
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">3</button>
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Next</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SalesPage;