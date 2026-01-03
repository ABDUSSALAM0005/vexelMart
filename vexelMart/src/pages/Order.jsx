import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, payOrder } from "../components/lib/auth"; // Adjust path if needed
import toast from "react-hot-toast";
import { PaystackButton } from "react-paystack";
export default function OrderScreen() {
  const { id } = useParams(); // Get ID from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // --- SUCCESS HANDLER ---
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

  // --- CONFIGURATION ---
  // Only create config if order exists
  const componentProps = order ? {
      email: order.user.email,
      amount: order.totalPrice * 100, // Amount in kobo
      metadata: {
        name: order.user.name,
        phone: "", // Add phone if you have it in user object
      },
      publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      text: "Pay Now (Paystack)",
      onSuccess: handlePaystackSuccessAction,
      onClose: handlePaystackCloseAction,
  } : null;

  if (loading) return <div className="text-white text-center mt-20">Loading Order...</div>;
  if (!order) return <div className="text-white text-center mt-20">Order Not Found</div>;

  

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 pb-24 sm:px-6 lg:px-8 text-white">
      <h1 className="text-3xl font-bold tracking-tight text-white">Order: {order._id}</h1>

      <div className="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        
        {/* LEFT COLUMN: Order Details */}
        <section className="lg:col-span-7">
          
          {/* Shipping Info */}
          <div className="border-b border-gray-700">
            <h2 className="text-lg font-medium text-white">Shipping</h2>
            <p className="mt-4 text-sm text-gray-300">
              <strong>Name: </strong> {order.user?.name} <br />
              <strong>Email: </strong> <a href={`mailto:${order.user?.email}`}>{order.user?.email}</a> <br />
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            
            {/* Delivery Status Alert */}
            <div className={`mt-4 p-4 rounded-md ${order.isDelivered ? "bg-green-600" : "bg-red-600/50"}`}>
              {order.isDelivered ? `Delivered on ${order.deliveredAt}` : "Not Delivered"}
            </div>
          </div>

          {/* Payment Info */}
          <div className="border-b border-gray-700 py-6">
            <h2 className="text-lg font-medium text-white">Payment Method</h2>
            <p className="mt-4 text-sm text-gray-300">
              <strong>Method: </strong> {order.paymentMethod}
            </p>

            {/* Payment Status Alert */}
            <div className={`mt-4 p-4 rounded-md ${order.isPaid ? "bg-green-600" : "bg-red-600/50"}`}>
              {order.isPaid ? `Paid on ${order.paidAt}` : "Not Paid"}
            </div>
          </div>

          {/* Order Items */}
          <div className="py-6">
            <h2 className="text-lg font-medium text-white">Order Items</h2>
            {order.orderItems.length === 0 ? (
              <p>Order is empty</p>
            ) : (
              <ul className="divide-y divide-gray-700">
                {order.orderItems.map((item, index) => (
                  <li key={index} className="flex py-6">
                    {/* Image */}
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-700">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-white">
                          <h3>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </h3>
                          <p className="ml-4">
                            {item.qty} x $ {item.price} = $ {item.qty * item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: Order Summary */}
        <section className="mt-16 rounded-lg bg-gray-800 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
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

            <div className="flex items-center justify-between border-t border-gray-600 pt-4">
              <dt className="text-base font-medium text-white">Total</dt>
              <dd className="text-base font-medium text-white">${order.totalPrice}</dd>
            </div>
          </dl>
        
          
          {!order.isPaid && (
            <div className="mt-6">
              
              <PaystackButton
              {...componentProps}
               className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700"
               />
            </div>
          )}

        </section>
      </div>
    </div>
  );
}