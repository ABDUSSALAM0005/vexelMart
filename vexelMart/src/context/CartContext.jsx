// import { createContext, useContext, useReducer, useEffect } from "react";
// import api from "../components/lib/axios";
// import { useAuth } from "./AuthContext";

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_CART":
//       return { ...state, cartItems: action.payload };

//     case "CLEAR_CART":
//       return { cartItems: [] };

//     case "ADD_TO_CART": {
//       const item = action.payload;
//       const existing = state.cartItems.find((p) => p._id === item._id);

//       if (existing) {
//         return {
//           ...state,
//           cartItems: state.cartItems.map((p) =>
//             p._id === item._id ? { ...p, qty: p.qty + 1 } : p
//           ),
//         };
//       }

//       return {
//         ...state,
//         cartItems: [...state.cartItems, { ...item, qty: 1 }],
//       };
//     }

//     default:
//       return state;
//   }
// };

// export const CartProvider = ({ children }) => {
//   const { user } = useAuth();

//   const [state, dispatch] = useReducer(cartReducer, {
//     cartItems: [],
//   });

//   // ✅ FETCH CART ON LOGIN
//   useEffect(() => {
//     const fetchCart = async () => {
//       if (user?.token) {
//         const { data } = await api.get("/cart", {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         });
//         console.log("CART DATA FROM BACKEND:", data);
//         dispatch({ type: "SET_CART", payload: data });
//       } else {
//         // ✅ USER LOGGED OUT → CLEAR CART
//         dispatch({ type: "CLEAR_CART" });
//       }
//     };

//     fetchCart();
//   }, [user]);

//   return (
//     <CartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// import { createContext, useContext, useReducer, useEffect } from "react";
// import api from "../components/lib/axios";
// import { useAuth } from "./AuthContext";

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_CART":
//       return { ...state, cartItems: action.payload };

//     case "CLEAR_CART":
//       return { cartItems: [] };

//     case "ADD_TO_CART": {
//       const item = action.payload;
//       const existing = state.cartItems.find((p) => p._id === item._id);

//       if (existing) {
//         return {
//           ...state,
//           cartItems: state.cartItems.map((p) =>
//             p._id === item._id ? { ...p, qty: p.qty + 1 } : p
//           ),
//         };
//       }

//       return {
//         ...state,
//         cartItems: [...state.cartItems, { ...item, qty: 1 }],
//       };
//     }

//     case "UPDATE_QTY": {
//       const { id, qty } = action.payload;
//       return {
//         ...state,
//         cartItems: state.cartItems.map((item) =>
//           item._id === id ? { ...item, qty } : item
//         ),
//       };
//     }

//     case "REMOVE_FROM_CART": {
//       const id = action.payload;
//       return {
//         ...state,
//         cartItems: state.cartItems.filter((item) => item._id !== id),
//       };
//     }

//     default:
//       return state;
//   }
// };

// export const CartProvider = ({ children }) => {
//   const { user } = useAuth();

//   const [state, dispatch] = useReducer(cartReducer, {
//     cartItems: [],
//   });

//   // Fetch cart on login
//   useEffect(() => {
//     const fetchCart = async () => {
//       if (user?.token) {
//         try {
//           const { data } = await api.get("/cart", {
//             headers: { Authorization: `Bearer ${user.token}` },
//           });
//           console.log("CART DATA FROM BACKEND:", data);
//           dispatch({ type: "SET_CART", payload: data });
//         } catch (err) {
//           console.error("Failed to fetch cart:", err);
//         }
//       } else {
//         dispatch({ type: "CLEAR_CART" });
//       }
//     };

//     fetchCart();
//   }, [user]);

//   return (
//     <CartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

import { createContext, useContext, useReducer, useEffect } from "react";
import api from "../components/lib/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cartItems: action.payload };

    case "CLEAR_CART":
      return { ...state, cartItems: [] };

    case "ADD_TO_CART": {
      const item = action.payload;

      const existing = state.cartItems.find(
        (x) => x.product._id === item.product._id
      );

      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product._id === item.product._id ? { ...x, qty: x.qty + 1 } : x
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    }

    case "UPDATE_QTY":
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.product && x.product._id === action.payload.id
            ? { ...x, qty: action.payload.qty }
            : x
        ),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.product && x.product._id !== action.payload
        ),
      };

     // ✅ FIXED: Save directly to state root (cleaner structure)
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        shippingAddress: action.payload,
      };

      case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();

  // const [state, dispatch] = useReducer(cartReducer, {
  //   cartItems: [],
  // });
  
  // ✅ FIXED: Load address from LocalStorage on first load
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {}, 
      paymentMethod: localStorage.getItem("paymentMethod")
      ? JSON.parse(localStorage.getItem("paymentMethod"))
      : "Paystack"
  });

  // ✅ 1. NEW FUNCTION TO CLEAR CART (Back & Front end)
  const clearCart = async () => {
    // Clear the UI immediately
    dispatch({ type: "CLEAR_CART" });

    // If user is logged in, tell backend to delete items
    if (user?.token) {
      try {
        // Adjust this endpoint path based on your backend routes
        // Common examples: api.delete("/cart") or api.post("/cart/clear")
        await api.delete("/cart", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } catch (err) {
        console.error("Failed to clear backend cart:", err);
      }
    }
  };

  // Fetch cart from backend when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (user?.token) {
        try {
          const { data } = await api.get("/cart", {
            headers: { Authorization: `Bearer ${user.token}` },
          });

          // ✅ FORCE cartItems to always be an array

          // Filter out any null products
          const filteredData = Array.isArray(data)
            ? data
            : data.cartItems || [];
          dispatch({ type: "SET_CART", payload: filteredData });
        } catch (err) {
          console.error("Failed to fetch cart:", err);
        }
      } else {
        dispatch({ type: "CLEAR_CART" });
      }
    };

    fetchCart();
  }, [user]);

  return (
    <CartContext.Provider value={{ state, dispatch, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
