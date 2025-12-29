import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    // 1. Validation: Check if there are items to order
    if (orderItems && orderItems.length === 0) {
      // Return 400 Bad Request
      return res.status(400).json({ message: 'No order items' });
    } 

    // 2. Create the Order Object
    const order = new Order({
      // Map over items to format them correctly for the Schema
      orderItems: orderItems.map((x) => ({
        name: x.product.name, // Assuming your cart item has product details inside 'product'
        qty: x.qty,
        image: x.product.image,
        price: x.product.price,
        product: x.product._id, // Important: Save the ID reference, not the whole object
      })),
      user: req.user._id, // This comes from your 'protect' middleware
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // 3. Save to Database
    const createdOrder = await order.save();

    // 4. Send back the created order
    res.status(201).json(createdOrder);

  } catch (error) {
    console.error("Error creating order:", error);
    // Return 500 Server Error
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export { addOrderItems };