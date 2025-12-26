import express from "express";
import { insertProducts, getProducts, getProductsById,  getProductsBySlug, createProducts, updateProducts, deleteProducts } from "../controllers/controllers.js";

const router = express.Router();

// router.post("/insert", insertProducts);

router.get("/", getProducts);

router.get("/:id", getProductsById);

router.get("/slug/:slug", getProductsBySlug);
 
router.post("/", createProducts)

router.put("/:id", updateProducts);

router.delete("/:id", deleteProducts);

export default router;
