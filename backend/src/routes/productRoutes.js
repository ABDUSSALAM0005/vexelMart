import express from "express";
import { insertProducts, getProducts, getProductsById,  getProductsBySlug, createProducts, updateProducts, deleteProducts, createProductReview } from "../controllers/productControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.post("/insert", insertProducts);

router.get("/", getProducts);

router.get("/slug/:slug", getProductsBySlug);

router.get("/:id/reviews", createProductReview);

router.get("/:id", getProductsById);
 
router.post("/create", protect, admin, createProducts, )

router.put("/:id", protect, admin, updateProducts, );

router.delete("/:id", protect, admin, deleteProducts, );

export default router;
