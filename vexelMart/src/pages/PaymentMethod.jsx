import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckOutSteps";

export default function PaymentMethod() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  // Default to Paystack since it's the best option
  const [paymentMethod, setPaymentMethod] = useState(
    state.paymentMethod || "Paystack"
  );

  useEffect(() => {
    if (!state.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [state.shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 pt-12 lg:px-8">
            <CheckoutSteps step1 step2 step3  />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Payment Method
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-4">
            
            {/* Option 1: Paystack */}
            <div className="flex items-center">
              <input
                id="Paystack"
                name="paymentMethod"
                type="radio"
                value="Paystack"
                checked={paymentMethod === "Paystack"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="Paystack" className="ml-3 block text-sm font-medium text-gray-100">
                Paystack (Card, USSD, Bank Transfer)
              </label>
            </div>

            {/* Option 2: Cash on Delivery (Optional) */}
            <div className="flex items-center">
              <input
                id="COD"
                name="paymentMethod"
                type="radio"
                value="Stripe"
                checked={paymentMethod === "Stripe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="COD" className="ml-3 block text-sm font-medium text-gray-100">
                Stripe
              </label>
            </div>
            
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}