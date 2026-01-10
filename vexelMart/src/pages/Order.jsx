// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { getOrderDetails, payOrder } from "../components/lib/auth"; // Adjust path if needed
// import toast from "react-hot-toast";
// import { PaystackButton } from "react-paystack";
// export default function OrderScreen() {
//   const { id } = useParams(); // Get ID from URL
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//     useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const data = await getOrderDetails(id);
//         setOrder(data);
//         setLoading(false);
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Failed to load order");
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [id]);

//   // --- SUCCESS HANDLER ---
//   const handlePaystackSuccessAction = async (reference) => {
//     console.log("🟢 Paystack Success!", reference);
    
//     try {
//       await payOrder(id, {
//         id: reference.reference,
//         status: reference.status,
//         update_time: String(Date.now()),
//         email_address: order.user.email,
//       });

//       toast.success("Payment Recorded Successfully!");
      
//       // Refresh order to show green status
//       const updatedOrder = await getOrderDetails(id);
//       setOrder(updatedOrder);

//     } catch (error) {
//       console.error("Backend Error:", error);
//       toast.error("Failed to save payment to database");
//     }
//   };

//   const handlePaystackCloseAction = () => {
//     console.log("Payment closed by user");
//     toast.error("Payment cancelled");
//   };

//   // --- CONFIGURATION ---
//   // Only create config if order exists
//   const componentProps = order ? {
//       email: order.user.email,
//       amount: order.totalPrice * 100, // Amount in kobo
//       metadata: {
//         name: order.user.name,
//         phone: "", // Add phone if you have it in user object
//       },
//       publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
//       text: "Pay Now (Paystack)",
//       onSuccess: handlePaystackSuccessAction,
//       onClose: handlePaystackCloseAction,
//   } : null;

//   if (loading) return <div className="text-white text-center mt-20">Loading Order...</div>;
//   if (!order) return <div className="text-white text-center mt-20">Order Not Found</div>;

  

//   return (
//     <div className="mx-auto max-w-7xl px-4 pt-12 pb-24 sm:px-6 lg:px-8 text-white">
//       <h1 className="text-3xl font-bold tracking-tight text-white">Order: {order._id}</h1>

//       <div className="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        
//         {/* LEFT COLUMN: Order Details */}
//         <section className="lg:col-span-7">
          
//           {/* Shipping Info */}
//           <div className="border-b border-gray-700">
//             <h2 className="text-lg font-medium text-white">Shipping</h2>
//             <p className="mt-4 text-sm text-gray-300">
//               <strong>Name: </strong> {order.user?.name} <br />
//               <strong>Email: </strong> <a href={`mailto:${order.user?.email}`}>{order.user?.email}</a> <br />
//               <strong>Address: </strong>
//               {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
//               {order.shippingAddress.postalCode}, {order.shippingAddress.country}
//             </p>
            
//             {/* Delivery Status Alert */}
//             <div className={`mt-4 p-4 rounded-md ${order.isDelivered ? "bg-green-600" : "bg-red-600/50"}`}>
//               {order.isDelivered ? `Delivered on ${order.deliveredAt}` : "Not Delivered"}
//             </div>
//           </div>

//           {/* Payment Info */}
//           <div className="border-b border-gray-700 py-6">
//             <h2 className="text-lg font-medium text-white">Payment Method</h2>
//             <p className="mt-4 text-sm text-gray-300">
//               <strong>Method: </strong> {order.paymentMethod}
//             </p>

//             {/* Payment Status Alert */}
//             <div className={`mt-4 p-4 rounded-md ${order.isPaid ? "bg-green-600" : "bg-red-600/50"}`}>
//               {order.isPaid ? `Paid on ${order.paidAt}` : "Not Paid"}
//             </div>
//           </div>

//           {/* Order Items */}
//           <div className="py-6">
//             <h2 className="text-lg font-medium text-white">Order Items</h2>
//             {order.orderItems.length === 0 ? (
//               <p>Order is empty</p>
//             ) : (
//               <ul className="divide-y divide-gray-700">
//                 {order.orderItems.map((item, index) => (
//                   <li key={index} className="flex py-6">
//                     {/* Image */}
//                     <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-700">
//                       <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
//                     </div>

//                     <div className="ml-4 flex flex-1 flex-col">
//                       <div>
//                         <div className="flex justify-between text-base font-medium text-white">
//                           <h3>
//                             <Link to={`/product/${item.product}`}>{item.name}</Link>
//                           </h3>
//                           <p className="ml-4">
//                             {item.qty} x $ {item.price} = $ {item.qty * item.price}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </section>

//         {/* RIGHT COLUMN: Order Summary */}
//         <section className="mt-16 rounded-lg bg-gray-800 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
//           <h2 className="text-lg font-medium text-white">Order Summary</h2>
//           <dl className="mt-6 space-y-4">
            
//             <div className="flex items-center justify-between border-t border-gray-600 pt-4">
//               <dt className="text-sm text-gray-400">Items</dt>
//               <dd className="text-sm font-medium text-white">${order.itemsPrice}</dd>
//             </div>
            
//             <div className="flex items-center justify-between border-t border-gray-600 pt-4">
//               <dt className="text-sm text-gray-400">Shipping</dt>
//               <dd className="text-sm font-medium text-white">${order.shippingPrice}</dd>
//             </div>
            
//             <div className="flex items-center justify-between border-t border-gray-600 pt-4">
//               <dt className="text-sm text-gray-400">Tax</dt>
//               <dd className="text-sm font-medium text-white">${order.taxPrice}</dd>
//             </div>

//             <div className="flex items-center justify-between border-t border-gray-600 pt-4">
//               <dt className="text-base font-medium text-white">Total</dt>
//               <dd className="text-base font-medium text-white">${order.totalPrice}</dd>
//             </div>
//           </dl>
        
          
//           {!order.isPaid && (
//             <div className="mt-6">
              
//               <PaystackButton
//               {...componentProps}
//                className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700"
//                />
//             </div>
//           )}

//         </section>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, payOrder } from "../components/lib/auth"; // Your existing helpers
import api from "../components/lib/axios"; // Import API for the admin put request
import { useAuth } from "../context/AuthContext"; // Import Auth Context
import toast from "react-hot-toast";
import { PaystackButton } from "react-paystack";
import { Loader2, Check } from "lucide-react"; // Import Icons

export default function OrderScreen() {
  const { id } = useParams();
  const { user } = useAuth(); // Get logged-in user to check if Admin
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDeliver, setLoadingDeliver] = useState(false); // State for deliver button

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderDetails(id);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load order");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // --- SUCCESS HANDLER (PAYSTACK) ---
  const handlePaystackSuccessAction = async (reference) => {
    console.log("🟢 Paystack Success!", reference);
    
    try {
      await payOrder(id, {
        id: reference.reference,
        status: reference.status,
        update_time: String(Date.now()),
        email_address: order.user.email,
      });

      toast.success("Payment Recorded Successfully!");
      
      // Refresh order to show green status
      const updatedOrder = await getOrderDetails(id);
      setOrder(updatedOrder);

    } catch (error) {
      console.error("Backend Error:", error);
      toast.error("Failed to save payment to database");
    }
  };

  const handlePaystackCloseAction = () => {
    console.log("Payment closed by user");
    toast.error("Payment cancelled");
  };

  // --- ADMIN DELIVER HANDLER ---
  const deliverHandler = async () => {
    try {
      setLoadingDeliver(true);
      await api.put(`/orders/${id}/deliver`); // Call backend API
      toast.success('Order marked as delivered');
      
      // Refresh order data
      const data = await getOrderDetails(id);
      setOrder(data);
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Deliver failed');
    } finally {
      setLoadingDeliver(false);
    }
  };

  // --- PAYSTACK CONFIG ---
  const componentProps = order ? {
      email: order.user.email,
      amount: order.totalPrice * 100, 
      metadata: {
        name: order.user.name,
        phone: "", 
      },
      publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      text: "Pay Now (Paystack)",
      onSuccess: handlePaystackSuccessAction,
      onClose: handlePaystackCloseAction,
  } : null;

  if (loading) return <div className="text-white text-center mt-20 flex justify-center"><Loader2 className="animate-spin" /></div>;
  if (!order) return <div className="text-white text-center mt-20">Order Not Found</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 pb-24 sm:px-6 lg:px-8 text-white">
      <div className="flex items-baseline justify-between">
         <h1 className="text-3xl font-bold tracking-tight text-white">Order: {order._id.substring()}</h1>
         <span className="text-sm text-gray-400">Placed on {order.createdAt?.substring(0, 10)}</span>
      </div>

      <div className="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        
        {/* LEFT COLUMN: Order Details */}
        <section className="lg:col-span-7">
          
          {/* Shipping Info */}
          <div className="border-b border-gray-700 pb-6">
            <h2 className="text-lg font-medium text-white">Shipping</h2>
            <p className="mt-4 text-sm text-gray-300 leading-6">
              <strong>Name: </strong> {order.user?.name} <br />
              <strong>Email: </strong> <a href={`mailto:${order.user?.email}`} className="text-indigo-400">{order.user?.email}</a> <br />
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            
            {/* Delivery Status Alert */}
            <div className={`mt-4 p-4 rounded-md flex items-center gap-2 ${order.isDelivered ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
              {order.isDelivered ? <Check className="w-5 h-5" /> : null}
              {order.isDelivered ? `Delivered on ${order.deliveredAt.substring(0, 10)}` : "Not Delivered"}
            </div>
          </div>

          {/* Payment Info */}
          <div className="border-b border-gray-700 py-6">
            <h2 className="text-lg font-medium text-white">Payment Method</h2>
            <p className="mt-4 text-sm text-gray-300">
              <strong>Method: </strong> {order.paymentMethod}
            </p>

            {/* Payment Status Alert */}
            <div className={`mt-4 p-4 rounded-md flex items-center gap-2 ${order.isPaid ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
              {order.isPaid ? <Check className="w-5 h-5" /> : null}
              {order.isPaid ? `Paid on ${order.paidAt.substring(0, 10)}` : "Not Paid"}
            </div>
          </div>

          {/* Order Items */}
          <div className="py-6">
            <h2 className="text-lg font-medium text-white">Order Items</h2>
            {order.orderItems.length === 0 ? (
              <p className="mt-4 text-gray-400">Order is empty</p>
            ) : (
              <ul className="divide-y divide-gray-700 mt-4">
                {order.orderItems.map((item, index) => (
                  <li key={index} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-700 bg-gray-800">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-center">
                        <div className="flex justify-between text-base font-medium text-white">
                          <h3>
                            <Link to={`/product/${item.product}`} className="hover:text-indigo-400">{item.name}</Link>
                          </h3>
                          <p className="ml-4 text-gray-400">
                            {item.qty} x ${item.price} = <span className="text-white">${item.qty * item.price}</span>
                          </p>
                        </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: Order Summary */}
        <section className="mt-16 rounded-lg bg-gray-800 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 border border-gray-700">
          <h2 className="text-lg font-medium text-white">Order Summary</h2>
          <dl className="mt-6 space-y-4">
            
            <div className="flex items-center justify-between border-t border-gray-600 pt-4">
              <dt className="text-sm text-gray-400">Items</dt>
              <dd className="text-sm font-medium text-white">${order.itemsPrice}</dd>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-600 pt-4">
              <dt className="text-sm text-gray-400">Shipping</dt>
              <dd className="text-sm font-medium text-white">${order.shippingPrice}</dd>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-600 pt-4">
              <dt className="text-sm text-gray-400">Tax</dt>
              <dd className="text-sm font-medium text-white">${order.taxPrice}</dd>
            </div>

            <div className="flex items-center justify-between border-t border-gray-600 pt-4 pb-4">
              <dt className="text-base font-bold text-white">Total</dt>
              <dd className="text-base font-bold text-indigo-400">${order.totalPrice}</dd>
            </div>
          </dl>
        
          {/* CUSTOMER PAY BUTTON */}
          {!order.isPaid && (
            <div className="mt-6">
              <PaystackButton
               {...componentProps}
               className="w-full bg-indigo-600 text-white font-bold py-3 rounded hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30"
               />
            </div>
          )}

          {/* === ADMIN DELIVER BUTTON === */}
          {/* Show only if: User is Admin AND Order is Paid AND NOT yet Delivered */}
          {user && user.isAdmin && order.isPaid && !order.isDelivered && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <button
                type="button"
                onClick={deliverHandler}
                disabled={loadingDeliver}
                className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition border border-gray-600 hover:border-gray-500"
              >
                {loadingDeliver ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <>
                    <Check className="w-5 h-5" /> Mark As Delivered
                  </>
                )}
              </button>
            </div>
          )}

        </section>
      </div>
    </div>
  );
}