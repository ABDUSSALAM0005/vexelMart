import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartIcon = () => {
  const { state } = useCart();

  const totalQty = state.cartItems.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <Link to="/cart" className="relative">
        <div>
      <ShoppingCart className="w-6 h-6"/>
      {totalQty > 0 && (
        <span className="absolute -top-4 -right-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {totalQty}
        </span>
      )}
      </div>
    </Link>
  );
};

export default CartIcon;
