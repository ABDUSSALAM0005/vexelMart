import { useState } from "react";
import { useCart } from "../context/CartContext"; // Import your context
import { useNavigate } from "react-router-dom";
import VexelMartLogo from "../assets/img/VexelMartLogo"
import CheckoutSteps from "./CheckOutSteps";


export default function ShippingAddress() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  // Load existing address if available (so they don't re-type it)
  const [address, setAddress] = useState(state.shippingAddress?.address || "");
  const [city, setCity] = useState(state.shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(state.shippingAddress?.postalCode || "");
  const [country, setCountry] = useState(state.shippingAddress?.country || "");

  const submitHandler = (e) => {
    e.preventDefault();
    
    // 1. Save to Context (and LocalStorage via your Context logic if you have it)
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { address, city, postalCode, country },
    });
    
    // 2. Persist to LocalStorage manually if your reducer doesn't do it automatically
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ address, city, postalCode, country })
    );

    // 3. Move to next step
    navigate("/payment");
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 pt-12 lg:px-8">
          <CheckoutSteps step1 step2  />
      <div className="sm:mx-auto justify-center sm:w-full sm:max-w-sm">
        <VexelMartLogo className="h-12 mx-auto w-auto" />
        <h2 className="mt-1 text-center text-2xl font-bold tracking-tight text-white">
          Shipping Address
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Address Input */}
          <div>
            <label className="block text-sm font-medium text-gray-100">
              Address
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full rounded-md bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* City Input */}
          <div>
            <label className="block text-sm font-medium text-gray-100">
              City
            </label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="block w-full rounded-md bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Postal Code Input */}
          <div>
            <label className="block text-sm font-medium text-gray-100">
              Postal Code
            </label>
            <input
              type="text"
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="block w-full rounded-md bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Country Input */}
          <div>
            <label className="block text-sm font-medium text-gray-100">
              Country
            </label>
            <input
              type="text"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="block w-full rounded-md bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
}