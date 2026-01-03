import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export async function addOrderItems (req, res) {
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

export async function getOrderById(req, res) {
  try {
    // We populate 'user' to get the name and email associated with this order
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      
      // We save the details Paystack gives us here
      order.paymentResult = {
        id: req.body.id,             // Paystack Reference
        status: req.body.status,     // "success"
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
