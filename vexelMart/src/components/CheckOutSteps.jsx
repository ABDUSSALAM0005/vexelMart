import React from 'react';
import { Link } from 'react-router-dom';

export default function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <nav className="flex justify-center items-center mb-8 mt-4 text-sm font-medium lg:text-base">
      <ol className="flex items-center w-full max-w-2xl space-x-2 sm:space-x-4">
        
        {/* Step 1: Sign In */}
        <li className="flex items-center">
          {step1 ? (
            <Link to="" className="text-indigo-600 hover:text-indigo-800">
              <span className="flex items-center">
                 <span className="mr-2">✅</span> Sign In
              </span>
            </Link>
          ) : (
            <span className="text-gray-400 cursor-not-allowed">Sign In</span>
          )}
          {/* Separator Line */}
          <div className={`h-0.5 w-4 sm:w-10 mx-2 ${step1 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
        </li>

        {/* Step 2: Shipping */}
        <li className="flex items-center">
          {step2 ? (
            <Link to="/shipping" className="text-indigo-600 hover:text-indigo-800">
              Shipping Address
            </Link>
          ) : (
            <span className="text-gray-400 cursor-not-allowed">Shipping</span>
          )}
          <div className={`h-0.5 w-4 sm:w-10 mx-2 ${step2 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
        </li>

        {/* Step 3: Payment */}
        <li className="flex items-center">
          {step3 ? (
            <Link to="/payment" className="text-indigo-600 hover:text-indigo-800">
              Payment Method
            </Link>
          ) : (
            <span className="text-gray-400 cursor-not-allowed">Payment</span>
          )}
          <div className={`h-0.5 w-4 sm:w-10 mx-2 ${step3 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
        </li>

        {/* Step 4: Place Order */}
        <li className="flex items-center">
          {step4 ? (
            <Link to="/placeorder" className="text-indigo-600 hover:text-indigo-800">
              Place Order
            </Link>
          ) : (
            <span className="text-gray-400 cursor-not-allowed">Place Order</span>
          )}
        </li>

      </ol>
    </nav>
  );
}