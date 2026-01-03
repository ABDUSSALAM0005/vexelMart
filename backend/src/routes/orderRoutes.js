import express from 'express';
import { addOrderItems, getOrderById, updateOrderToPaid } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js'; // Ensure you have this middleware

// POST /api/orders
// The 'protect' middleware ensures only logged-in users can place orders
const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);

export default router;