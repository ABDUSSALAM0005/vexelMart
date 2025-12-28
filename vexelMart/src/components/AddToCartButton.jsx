import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/Alert";
import api from "../components/lib/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';



const AddToCartButton = ({ product }) => {
  const { state, dispatch } = useCart();
  const [showError, setShowError] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate()
  


  const addToCartHandler = async () => {

    if(!user) {
      navigate("/signin");
      toast("Sign in first to continue shopping", {
        style: {
          borderRadius: '10px',
          background: "#1e293b",
          color: "#6366f1"
        }
      });
      return;
    }
    
  const existItem = state.cartItems.find(
    (x) => x.product && x.product._id === product._id
  );

  const qty = existItem ? existItem.qty + 1 : 1;

  // ✅ STOCK CHECK (VERY IMPORTANT)
  if (qty > product.countInStock) {
    toast.error("Item out of stock");
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
    return;
  } 

  if (user?.token) {
    //logged-in backend controls everything
    try {
      await api.post(
        "/cart",
        { productId: product._id, qty },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
        dispatch({ type: "ADD_TO_CART", payload: { product, qty } });
    } catch (error) {
      console.error("Failed to update cart on server:", error);
      toast.error("Failed to add to cart")
    } finally{
      toast.success("Item added to cart");
    }
  } else {
    //guest frontend only
      dispatch({ type: "ADD_TO_CART", payload: { product, qty } });
  }
  }

  return (
    <div className="space-y-2">
      {showError && (
        <Alert variant="destructive">
          <div>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Product is out of stock
            </AlertDescription>
          </div>
        </Alert>
      )}

      <button
        onClick={addToCartHandler}
        className="px-4 py-2 text-sm font-medium bg-white text-primary hover:bg-primary hover:text-white rounded-xl shadow"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartButton;
