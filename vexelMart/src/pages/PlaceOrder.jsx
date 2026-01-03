import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder, getOrderDetails } from "../components/lib/auth"; // Import your API function
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';
import CheckOutSteps from "../components/CheckOutSteps";

export default function PlaceOrder() {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const { user } = useAuth();
  
  const { cartItems, shippingAddress, paymentMethod } = state;

  // 1. Calculate Prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)
  );
  
  // Example: Shipping is free if over $100, otherwise $10
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  
  // Example: Tax is 15%
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  // 2. Handle Place Order
  const placeOrderHandler = async () => {
    try {
     const newOrder =  await createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      });


      // Clear cart after success
      await clearCart()
      localStorage.removeItem("cartItems"); // Optional depending on your logic
      
      toast.success("Order Placed Successfully!");
      // Redirect to home or order history
      navigate(`/order/${ newOrder._id }`);
      
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Order failed");
    }
  };

  useEffect(() => {
    if (!paymentMethod) {
      navigate('/payment');
    }
  }, [paymentMethod, navigate]);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 pb-24 sm:px-6 lg:px-8 text-white">
        <CheckOutSteps step1 step2 step3 step4 />
      <h1 className="text-3xl font-bold tracking-tight text-white">Review Order</h1>
      
      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        
        {/* Left Side: Order Details */}
        <section className="lg:col-span-7">
          
          {/* Shipping */}
          <div className="border-b border-gray-700 py-6">
            <h2 className="text-lg font-medium text-white">Shipping</h2>
            <p className="mt-4 text-sm text-gray-300">
              <strong>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          {/* Payment Method */}
          <div className="border-b border-gray-700 py-6">
            <h2 className="text-lg font-medium text-white">Payment Method</h2>
            <p className="mt-4 text-sm text-gray-300">
              <strong>Method: </strong>
              {paymentMethod}
            </p>
          </div>

          {/* Order Items */}
          <div className="py-6">
            <h2 className="text-lg font-medium text-white">Order Items</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul className="divide-y divide-gray-700">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex py-6">
                    {/* Assuming item.product has image and name */}
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-white">
                          <h3>
                            <Link to={`/product/${item.product._id}`}>
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="ml-4">
                            {item.qty} x ${item.product.price} = ${item.qty * item.product.price}
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

        {/* Right Side: Order Summary */}
        <section className="mt-16 rounded-lg bg-gray-800 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
          <h2 className="text-lg font-medium text-white">Order Summary</h2>
          <dl className="mt-6 space-y-4">
            
            <div className="flex items-center justify-between border-t border-gray-600 pt-4">
              <dt className="text-sm text-gray-400">Items</dt>
              <dd className="text-sm font-medium text-white">${itemsPrice}</dd>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-600 pt-4">
              <dt className="text-sm text-gray-400">Shipping</dt>
              <dd className="text-sm font-medium text-white">${shippingPrice}</dd>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-600 pt-4">
              <dt className="text-sm text-gray-400">Tax</dt>
              <dd className="text-sm font-medium text-white">${taxPrice}</dd>
            </div>

            <div className="flex items-center justify-between border-t border-gray-600 pt-4">
              <dt className="text-base font-medium text-white">Total</dt>
              <dd className="text-base font-medium text-white">${totalPrice}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <button
              type="button"
              onClick={placeOrderHandler}
              disabled={cartItems.length === 0}
              className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-600"
            >
              Place Order
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}