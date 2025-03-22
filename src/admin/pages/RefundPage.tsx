import { useState } from 'react';
import { Search, ChevronDown, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const RefundPage = () => {
    const [period, setPeriod] = useState('This Month');

    // Sample refund data
    const refundData = [
        { id: '#REF-001', order: '#INV-052', customer: 'Amanda Wilson', amount: '$79.99', reason: 'Wrong size', status: 'Approved', date: '15 Mar 2025' },
        { id: '#REF-002', order: '#INV-047', customer: 'Robert Chen', amount: '$129.50', reason: 'Damaged item', status: 'Pending', date: '14 Mar 2025' },
        { id: '#REF-003', order: '#INV-039', customer: 'Jessica Miller', amount: '$45.75', reason: 'Changed mind', status: 'Rejected', date: '12 Mar 2025' },
        { id: '#REF-004', order: '#INV-035', customer: 'Thomas Brown', amount: '$199.99', reason: 'Not as described', status: 'Approved', date: '10 Mar 2025' },
        { id: '#REF-005', order: '#INV-031', customer: 'Olivia Garcia', amount: '$67.50', reason: 'Damaged item', status: 'Pending', date: '09 Mar 2025' },
    ];

    // Status color and icon mapping
    const getStatusInfo = (status: any) => {
        switch (status) {
            case 'Approved':
                return {
                    color: 'bg-green-100 text-green-800',
                    icon: <CheckCircle className="w-4 h-4 mr-1" />
                };
            case 'Pending':
                return {
                    color: 'bg-yellow-100 text-yellow-800',
                    icon: <AlertCircle className="w-4 h-4 mr-1" />
                };
            case 'Rejected':
                return {
                    color: 'bg-red-100 text-red-800',
                    icon: <XCircle className="w-4 h-4 mr-1" />
                };
            default:
                return {
                    color: 'bg-gray-100 text-gray-800',
                    icon: null
                };
        }
    };

    return (
        <div className="flex">
            <div>
                <AdminSidebar />
            </div>
            <div className='flex-1 m-5'>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-medium">Refund Management</h1>
                    <div className="flex items-center space-x-4">
                        <div className="border border-gray-200 rounded-lg flex items-center">
                            <button className="px-3 py-2 flex items-center">
                                <span className="mr-2 text-sm">{period}</span>
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Refund summary cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">Total Refunds</p>
                        <h3 className="text-xl font-semibold mt-1">$2,345.67</h3>
                        <p className="text-xs text-red-500 mt-1">+8.2% from last month</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">Refund Rate</p>
                        <h3 className="text-xl font-semibold mt-1">3.4%</h3>
                        <p className="text-xs text-green-500 mt-1">-0.5% from last month</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">Pending Refunds</p>
                        <h3 className="text-xl font-semibold mt-1">12</h3>
                        <p className="text-xs text-yellow-500 mt-1">+2 from last month</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-500">Avg. Processing Time</p>
                        <h3 className="text-xl font-semibold mt-1">2.3 days</h3>
                        <p className="text-xs text-green-500 mt-1">-0.3 days from last month</p>
                    </div>
                </div>

                {/* Refund table */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="font-medium">Recent Refunds</h2>
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search refunds..."
                                className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-sm w-64"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Refund ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {refundData.map((refund) => {
                                    const statusInfo = getStatusInfo(refund.status);
                                    return (
                                        <tr key={refund.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{refund.id}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{refund.order}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{refund.customer}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">{refund.amount}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{refund.reason}</td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${statusInfo.color} flex items-center justify-center w-24`}>
                                                    {statusInfo.icon}
                                                    {refund.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{refund.date}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                                                <button className="text-blue-600 hover:text-blue-800">Process</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Showing 1 to 5 of 32 entries
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

export default RefundPage;