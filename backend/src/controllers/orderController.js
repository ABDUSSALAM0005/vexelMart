import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
import axios from 'axios';


dotenv.config()

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

export const getMyOrders = async (req, res) => {
  try {
    // Find orders where the 'user' field matches the logged-in ID
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// export const updateOrderToPaid = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
      
//       // We save the details Paystack gives us here
//       order.paymentResult = {
//         id: req.body.id,             // Paystack Reference
//         status: req.body.status,     // "success"
//         update_time: req.body.update_time,
//         email_address: req.body.email_address,
//       };

//       const updatedOrder = await order.save();

//       // ✅ 2. NEW LOGIC: Update Product CountInStock
      
//       // Loop through every item in the order
//       for (const item of order.orderItems) {
        
//         // Find the product in the database
//         const product = await Product.findById(item.product);

//         if (product) {
//           // Decrease stock by the quantity bought
//           product.countInStock = product.countInStock - item.qty;

//           // Save the updated product
//           await product.save();
//         }
//       }

//       res.json(updatedOrder);
//     } else {
//       res.status(404).json({ message: "Order not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// ... existing imports

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    // Populate user ID and name associated with the order
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const paymentReference = req.body.id; // This comes from frontend { id: reference }

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ----------------------------------------------------------------
    // 🔒 SECURITY CHECK: Verify Transaction with Paystack
    // ----------------------------------------------------------------
    
    // We call Paystack servers directly using our SECRET KEY
    const paystackUrl = `https://api.paystack.co/transaction/verify/${paymentReference}`;
    
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.VITE_PAYSTACK_PRIVATE_KEY}`,
      },
    };

    const { data: paystackResponse } = await axios.get(paystackUrl, config);
    const { status, amount } = paystackResponse.data;

    // Check 1: Was the transaction actually successful?
    if (status !== 'success') {
      console.log("Failed : status is not success")
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // Check 2: Did they pay the correct amount?
    // We allow a small difference due to floating point math
    const expectedAmount = Math.round(order.totalPrice * 100);

    // Calculate the difference
    const difference = Math.abs(amount - expectedAmount);
    console.log(`Expected: ${expectedAmount}, Received: ${amount}, Diff: ${difference}`);

  if (difference > 5) {
      return res.status(400).json({ 
          message: "Invalid payment amount", 
          expected: expectedAmount, 
          received: amount 
      });
    }

    // ----------------------------------------------------------------
    // ✅ VERIFICATION PASSED - SAVE TO DB
    // ----------------------------------------------------------------
   console.log("✅ Verification Passed! Saving...");
   

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: status,
      update_time: String(Date.now()),
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();

    // ----------------------------------------------------------------
    // 📦 STOCK UPDATE (Deduct Inventory)
    // ----------------------------------------------------------------
    // for (const item of order.orderItems) {
    //   const product = await Product.findById(item.product);
    //   if (product) {
    //     product.countInStock = product.countInStock - item.qty;
    //     await product.save();
    //   }
    // }

    for (const item of order.orderItems) {
      // Use updateOne with $inc to bypass strict document validation 
      // and only update the stock number.
      await Product.updateOne(
        { _id: item.product },
        { $inc: { countInStock: -item.qty } } 
      );
    }

    res.json(updatedOrder);

  } catch (error) {
    console.error("CRITICAL ERROR", error.response?.data || error.message);
    res.status(500).json({ message: "Payment Verification Failed" });
  }
};

export const getDashboardSummary = async (req, res) => {
  try {
    // 1. Total Orders & Sales
    const orders = await Order.aggregate([

      {
        $match: { isPaid: true } // <--- Filter: Only Count Paid Orders
      },

      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);

    // 2. Total Users
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);

    // 3. Daily Orders (For the Chart)
    const dailyOrders = await Order.aggregate([

      {
        $match: { isPaid: true } // <--- Filter: Only Count Paid Orders
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 4. Product Categories (For Pie Chart)
    const productCategories = await Order.aggregate([
      {
        $match: { isPaid: true } // Only look at sold items
      },
      {
        $unwind: "$orderItems" // Split order into individual items
      },
      {
        $lookup: {
          from: "products", // Join with the 'products' collection
          localField: "orderItems.product",
          foreignField: "_id",
          as: "productDoc"
        }
      },
      {
        $unwind: "$productDoc" // Unpack the joined product array
      },
      {
        $group: {
          _id: "$productDoc.category", // Group by the Category of the item sold
          count: { $sum: "$orderItems.qty" } // Sum up the QUANTITY sold
        }
      }
    ]);

    res.send({ users, orders, dailyOrders, productCategories });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};