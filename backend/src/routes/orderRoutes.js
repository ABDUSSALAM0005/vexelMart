import express from 'express';
import { addOrderItems, getOrderById, getMyOrders, updateOrderToPaid, getDashboardSummary, getOrders, updateOrderToDelivered } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Ensure you have this middleware

// POST /api/orders
// The 'protect' middleware ensures only logged-in users can place orders
const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);

//Admin Route
router.get('/', protect, admin, getOrders)
router.get("/summary", protect, admin, getDashboardSummary);

router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put('/:id/deliver', protect,admin, updateOrderToDelivered)

export default router;