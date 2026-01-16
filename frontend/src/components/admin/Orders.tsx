import { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
    id: number;
    user_id: number;
    total_amount: number;
    price: number;
    First_Name: string;
    Last_Name: string;
    Email: string;
    Address: string;
    City: string;
    Zipcode: string;
    Country: string;
    Phone_Number: string;
    Payment_Method: string;
    created_at: string;
    updated_at: string;
}

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8000/api/orders/get');
            setOrders(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load orders');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order.First_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.Last_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toString().includes(searchTerm);
        
        return matchesSearch;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('sr-RS', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('sr-RS', {
            style: 'currency',
            currency: 'RSD'
        }).format(price);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                    <p className="text-neutral-400">Loading orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button 
                        onClick={fetchOrders}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
                    <p className="text-neutral-400">Total orders: {orders.length}</p>
                </div>

                {/* Filters */}
                <div className="mb-6 flex gap-4">
                    <input
                        type="text"
                        placeholder="Search by name, email or order ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded focus:outline-none focus:border-indigo-500"
                    />
                    <button 
                        onClick={fetchOrders}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded"
                    >
                        Refresh
                    </button>
                </div>

                {/* Orders Table */}
                <div className="bg-neutral-800 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-neutral-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Payment</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-700">
                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-8 text-center text-neutral-400">
                                            No orders found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-neutral-750">
                                            <td className="px-4 py-3 text-sm font-mono text-indigo-400">
                                                #{order.id}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {order.First_Name} {order.Last_Name}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-neutral-300">
                                                {order.Email}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-neutral-300">
                                                {order.City}, {order.Country}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-neutral-300">
                                                {order.Phone_Number}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                <span className="px-2 py-1 bg-neutral-700 rounded text-xs">
                                                    {order.Payment_Method}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm font-semibold text-green-400">
                                                {formatPrice(order.total_amount)}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-neutral-400">
                                                {formatDate(order.created_at)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-neutral-800 p-4 rounded-lg">
                        <p className="text-neutral-400 text-sm mb-1">Total Revenue</p>
                        <p className="text-2xl font-bold text-green-400">
                            {formatPrice(orders.reduce((sum, order) => sum + order.total_amount, 0))}
                        </p>
                    </div>
                    <div className="bg-neutral-800 p-4 rounded-lg">
                        <p className="text-neutral-400 text-sm mb-1">Average Order Value</p>
                        <p className="text-2xl font-bold text-indigo-400">
                            {formatPrice(orders.length > 0 ? orders.reduce((sum, order) => sum + order.total_amount, 0) / orders.length : 0)}
                        </p>
                    </div>
                    <div className="bg-neutral-800 p-4 rounded-lg">
                        <p className="text-neutral-400 text-sm mb-1">Total Orders</p>
                        <p className="text-2xl font-bold">{orders.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}