import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../components/lib/axios';
import { Loader2, Eye, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders');
        setOrders(data);
      } catch (error) {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-white w-8 h-8"/></div>;

  return (
    <div className="p-6 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Order Management</h1>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-700/50 text-xs uppercase font-medium text-gray-300">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">USER</th>
                <th className="px-6 py-4">DATE</th>
                <th className="px-6 py-4">TOTAL</th>
                <th className="px-6 py-4">PAID</th>
                <th className="px-6 py-4">DELIVERED</th>
                <th className="px-6 py-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 font-mono text-xs">{order._id.substring(0, 10)}...</td>
                  <td className="px-6 py-4 font-medium text-white">{order.user && order.user.name}</td>
                  <td className="px-6 py-4">{order.createdAt.substring(0, 10)}</td>
                  <td className="px-6 py-4 text-green-400 font-bold">${order.totalPrice}</td>
                  
                  {/* Paid Status */}
                  <td className="px-6 py-4">
                    {order.isPaid ? (
                      <span className="flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-1 rounded text-xs w-fit">
                         <Check className="w-3 h-3"/> {order.paidAt?.substring(0, 10)}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-500 bg-red-500/10 px-2 py-1 rounded text-xs w-fit">
                         <X className="w-3 h-3"/> Not Paid
                      </span>
                    )}
                  </td>

                  {/* Delivered Status */}
                  <td className="px-6 py-4">
                    {order.isDelivered ? (
                      <span className="flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-1 rounded text-xs w-fit">
                         <Check className="w-3 h-3"/> {order.deliveredAt?.substring(0, 10)}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded text-xs w-fit">
                         Pending
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link to={`/order/${order._id}`}>
                        <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition">
                            <Eye className="w-4 h-4" />
                        </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}