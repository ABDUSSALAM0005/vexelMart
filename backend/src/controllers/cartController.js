// import User from "../models/userMosdel.js";

// export const getUserCart = async (req, res) => {
//   const user = await User.findById(req.user._id).populate("cartItems.product");
//   res.json(user.cartItems);
// };

// export const addToCart = async (req, res) => {
//   const { productId, qty } = req.body;

//   // const user = await User.findById(req.user._id);
//   const user = await User.findById(req.user._id);
//   const existItem = user.cartItems.find(
//     (item) => item.product.toString() === productId
//   );

//   if (existItem) {
//     existItem.qty += qty;
//   } else {
//     user.cartItems.push({ product: productId, qty });
//   }

//   await user.save();
//   res.json(user.cartItems);
// };

// export const updateCartQty = async (req, res) => {
//   const { productId, qty } = req.body;
//   const user = await User.findById(req.user._id);

//   const item = user.cartItems.find(
//     (i) => i.product.toString() === productId
//   );

//   if (item) item.qty = qty;

//   await user.save();
//   res.json(user.cartItems);
// };

// export const removeFromCart = async (req, res) => {
//   const user = await User.findById(req.user._id);

//   user.cartItems = user.cartItems.filter(
//     (i) => i.product.toString() !== req.params.productId
//   );

//   await user.save();
//   res.json(user.cartItems);
// };

// Add to Cart


import User from "../models/userMosdel.js";

// GET USER CART
export const getUserCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cartItems.product");
    res.json(user.cartItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart", error: err.message });
  }
};

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const user = await User.findById(req.user._id);
    const existItem = user.cartItems.find(
      (item) => item.product.toString() === productId
    );

    if (existItem) {
      existItem.qty = qty;
    } else {
      user.cartItems.push({ product: productId, qty });
    }

    await user.save();
    res.json(user.cartItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart", error: err.message });
  }
};

// UPDATE CART QUANTITY
export const updateCartQty = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const user = await User.findById(req.user._id);
    const item = user.cartItems.find((i) => i.product.toString() === productId);
    if (item) item.qty = qty;

    await user.save();
    res.json(user.cartItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to update cart", error: err.message });
  }
};

// REMOVE FROM CART
export const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cartItems = user.cartItems.filter(
      (i) => i.product.toString() !== req.params.productId
    );
    await user.save();
    res.json(user.cartItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to remove from cart", error: err.message });
  }
};
