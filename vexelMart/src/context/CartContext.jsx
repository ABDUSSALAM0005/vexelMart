import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = action.payload;

      const existing = state.cartItems.find((p) => p._id === item._id);

      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map((p) =>
            p._id === item._id ? { ...p, qty: p.qty + 1 } : p
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { ...item, qty: 1 }],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== action.payload),
      };

    case "UPDATE_QTY": {
      const { id, qty } = action.payload;

      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === id ? { ...item, qty } : item
        ),
      };  
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
