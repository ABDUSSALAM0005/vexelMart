import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUserCart,
  addToCart,
  removeFromCart,
  updateCartQty,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getUserCart);
router.post("/", protect, addToCart);
router.put("/", protect, updateCartQty);
router.delete("/:productId", protect, removeFromCart);

export default router;
