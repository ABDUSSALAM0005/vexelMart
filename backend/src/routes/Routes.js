import express from "express";
import { getProducts, createProducts, updateProducts, deleteProducts } from "../controllers/controllers.js";

const router = express.Router();

router.get("/", getProducts);
 
router.post("/", createProducts)

router.put("/:id", updateProducts);

router.delete("/:id", deleteProducts);

export default router;
