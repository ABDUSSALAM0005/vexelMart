import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/Alert";


const AddToCartButton = ({ product }) => {
  const { state, dispatch } = useCart();
  const [showError, setShowError] = useState(false);

  const addToCartHandler = () => {
    const existItem = state.cartItems.find(
      (x) => x.id === product.id
    );

    const qty = existItem ? existItem.qty + 1 : 1;

    if (product.countInStock < qty) {
    setShowError(true);
    setTimeout(() => {
    setShowError(false);
    },3000)
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, qty }
    });
  };

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
