// import React, { useEffect, useReducer } from 'react';
// import { Users, ShoppingBag, DollarSign, Loader2, TrendingUp } from 'lucide-react';
// import api from '../components/lib/axios'; // Your axios instance
// import toast from 'react-hot-toast';

// // Simple reducer to manage complex state fetching
// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };
//     case 'FETCH_SUCCESS':
//       return { ...state, summary: action.payload, loading: false };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export default function AdminDashboard() {
//   const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
//     loading: true,
//     error: '',
//     summary: {},
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         dispatch({ type: 'FETCH_REQUEST' });
//         const { data } = await api.get('/orders/summary'); // Matches your backend route
//         dispatch({ type: 'FETCH_SUCCESS', payload: data });
//       } catch (err) {
//         dispatch({ 
//             type: 'FETCH_FAIL', 
//             payload: err.response?.data?.message || err.message 
//         });
//         toast.error("Failed to load dashboard data");
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) {
//      return (
//         <div className="flex h-[50vh] items-center justify-center">
//              <Loader2 className="h-10 w-10 animate-spin text-primary" />
//         </div>
//      )
//   }

//   if (error) {
//      return <div className="text-red-500 text-center mt-10">Error: {error}</div>
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-white mb-8">Dashboard Overview</h1>
      
//       {/* 1. STATS CARDS ROW */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
//         {/* Card 1: Total Sales */}
//         <div className="bg-card border border-white/10 rounded-xl p-6 shadow-sm flex items-center gap-4">
//           <div className="p-3 bg-green-500/10 rounded-full text-green-500">
//              <DollarSign className="w-8 h-8" />
//           </div>
//           <div>
//              <p className="text-sm text-gray-400">Total Sales</p>
//              <h3 className="text-2xl font-bold text-white">
//                 ${summary.orders && summary.orders[0] 
//                   ? summary.orders[0].totalSales.toFixed(2) 
//                   : 0}
//              </h3>
//           </div>
//         </div>

//         {/* Card 2: Total Orders */}
//         <div className="bg-card border border-white/10 rounded-xl p-6 shadow-sm flex items-center gap-4">
//           <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
//              <ShoppingBag className="w-8 h-8" />
//           </div>
//           <div>
//              <p className="text-sm text-gray-400">Total Orders</p>
//              <h3 className="text-2xl font-bold text-white">
//                 {summary.orders && summary.orders[0] 
//                   ? summary.orders[0].numOrders 
//                   : 0}
//              </h3>
//           </div>
//         </div>

//         {/* Card 3: Total Users */}
//         <div className="bg-card border border-white/10 rounded-xl p-6 shadow-sm flex items-center gap-4">
//           <div className="p-3 bg-orange-500/10 rounded-full text-orange-500">
//              <Users className="w-8 h-8" />
//           </div>
//           <div>
//              <p className="text-sm text-gray-400">Total Users</p>
//              <h3 className="text-2xl font-bold text-white">
//                 {summary.users && summary.users[0] 
//                   ? summary.users[0].numUsers 
//                   : 0}
//              </h3>
//           </div>
//         </div>
//       </div>

//       {/* 2. PLACEHOLDER FOR CHARTS (We can add this later) */}
//       <div className="bg-card border border-white/10 rounded-xl p-6 h-64 flex flex-col items-center justify-center text-gray-500">
//          <TrendingUp className="w-10 h-10 mb-2 opacity-50"/>
//          <p>Sales Chart will go here</p>
//       </div>

//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import api from '../components/lib/axios'; // Your axios instance
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { Users, ShoppingBag, DollarSign, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    users: [],
    orders: [],
    dailyOrders: [],
    productCategories: []
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await api.get('/orders/summary');
        setSummary(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) {
     return <div className="flex h-full items-center justify-center text-white"><Loader2 className="animate-spin w-8 h-8"/></div>;
  }

  // Extract data safely
  const totalUsers = summary.users[0]?.numUsers || 0;
  const totalOrders = summary.orders[0]?.numOrders || 0;
  const totalSales = summary.orders[0]?.totalSales?.toFixed(2) || 0;

  // Colors for Pie Chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className=" space-y-6 text-white">
      
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* 1. STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sales Card */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-500/20 rounded-full text-green-500">
            <DollarSign className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Sales</p>
            <h3 className="text-2xl font-bold">${totalSales}</h3>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-full text-blue-500">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Orders</p>
            <h3 className="text-2xl font-bold">{totalOrders}</h3>
          </div>
        </div>

        {/* Users Card */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-500/20 rounded-full text-orange-500">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Users</p>
            <h3 className="text-2xl font-bold">{totalUsers}</h3>
          </div>
        </div>
      </div>

      {/* 2. CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        
        {/* Daily Sales Chart */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold mb-6">Daily Sales</h3>
          {summary.dailyOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No sales data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={summary.dailyOrders}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="_id" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }} 
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Product Categories Pie Chart */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
           <h3 className="text-xl font-semibold mb-6">Units Sold by Category</h3>
           {summary.productCategories.length === 0 ? (
             <p className="text-gray-500 text-center py-10">No product data yet.</p>
           ) : (
             <ResponsiveContainer width="100%" height={300}>
               <PieChart>
                 <Pie
                   data={summary.productCategories}
                   dataKey="count"
                   nameKey="_id"
                   cx="50%"
                   cy="50%"
                   outerRadius={100}
                   label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                 >
                   {summary.productCategories.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip />
               </PieChart>
             </ResponsiveContainer>
           )}
        </div>
      </div>

    </div>
  );
}