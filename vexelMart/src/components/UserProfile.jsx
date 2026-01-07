// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { listMyOrders } from "../components/lib/auth"; // Adjust path
// import { useAuth } from "../context/AuthContext"; // Adjust path
// import toast from "react-hot-toast";

// const UserProfile = () => {

//       const { user, logout } = useAuth(); // Assuming you have logout in context
//       const navigate = useNavigate();
      
//       const [orders, setOrders] = useState([]);
//       const [loadingOrders, setLoadingOrders] = useState(true);
    
//       // Fetch Orders on load
//       useEffect(() => {
//         const fetchOrders = async () => {
//           try {
//             const data = await listMyOrders();
//             setOrders(data);
//             setLoadingOrders(false);
//           } catch (error) {
//             toast.error(error.response?.data?.message || "Failed to load orders");
//             setLoadingOrders(false);
//           }
//         };
    
//         if (user) {
//           fetchOrders();
//         } else {
//           navigate('/login');
//         }
//       }, [navigate, user]);

//   return (
//     <div>
//       <div className="md:col-span-1">
//         <div className="px-4 sm:px-0">
//           <h3 className="text-2xl font-bold leading-6 text-white">
//             User Profile
//           </h3>
//           <div className="mt-4 bg-gray-800 p-6 rounded-lg shadow">
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-400">
//                 Name
//               </label>
//               <p className="text-lg text-white">{user?.name}</p>
//             </div>
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-400">
//                 Email
//               </label>
//               <p className="text-lg text-white">{user?.email}</p>
//             </div>

//             <button
//               onClick={logout}
//               className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


import React from "react";
import { useAuth } from "../context/AuthContext";
import { Lock, Pencil, FileText } from 'lucide-react'; // Icons

const UserProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6">
      
      {/* 1. HEADER SECTION (Avatar + Name + Stats) */}
      <div className="bg-card border border-white/10 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          
          {/* Avatar */}
          <div className="relative">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png" // Default User Icon
              alt="Profile" 
              className="h-20 w-20 rounded-full border-4 border-background bg-gray-200 object-cover"
            />
            {/* Edit Icon Button */}
            <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full hover:bg-orange-600 transition">
              <Pencil className="w-3 h-3" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              {user?.name}
            </h1>
            <p className="text-gray-400 text-sm">{user?.email}</p>
            
            {/* Stats Row */}
            <div className="flex gap-8 mt-4">
              <div className="text-center md:text-left">
                <span className="block text-xl font-bold text-white">0</span>
                <span className="text-xs text-gray-500 uppercase tracking-wide">Reviews</span>
              </div>
              <div className="border-l border-gray-700 pl-8 text-center md:text-left">
                <span className="block text-xl font-bold text-white">0</span>
                <span className="text-xs text-gray-500 uppercase tracking-wide">Helpfuls</span>
              </div>
            </div>
          </div>

          {/* Logout Button (Moved to top right for better UX) */}
          <button
            onClick={logout}
            className="px-4 py-2 border border-red-500/50 text-red-500 hover:bg-red-500/10 rounded-lg text-sm font-medium transition"
          >
            Sign Out
          </button>
        </div>

        {/* Security Banner */}
        <div className="mt-6 flex items-center gap-2 text-xs text-green-400 bg-green-400/10 p-3 rounded border border-green-400/20">
          <Lock className="w-3 h-3" />
          <span>Your information is encrypted and effectively protected.</span>
        </div>
      </div>

      {/* 2. CONTENT AREA (Edit Form can go here later) */}
      <div className="bg-card border border-white/10 rounded-xl p-8 text-center">
         <div className="flex flex-col items-center justify-center py-10">
            <div className="p-4 bg-gray-800 rounded-full mb-4">
               <FileText className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-white">Manage your account</h3>
            <p className="text-gray-400 text-sm mt-2 max-w-sm">
               You can update your personal details and password here.
            </p>
         </div>
      </div>

    </div>
  );
};

export default UserProfile;
