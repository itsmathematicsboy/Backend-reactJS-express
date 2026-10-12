import { Router } from "express";

import { createProduk, deleteProduct, getAllProduk, getOneData, updateProduct } from "../controllers/productController.js";
import { updateCategories } from "../controllers/CategoryController.js";

const router = Router();
router.get("/", getAllProduk);
router.get("/:id", getOneData);
router.post("/", createProduk);
router.put("/:id", updateProduct);
router.delete("/id", deleteProduct);
export default router;
