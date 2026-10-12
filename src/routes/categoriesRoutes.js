import { Router } from "express";
import {
  getAllCategories,
  categoriesId,
  createCategories,
  updateCategories,
  deleteCategories,
} from "../controllers/CategoryController.js";
const router = Router();

router.get("/", getAllCategories);
router.get("/:id", categoriesId);
router.put("/:id", updateCategories);
router.post("/", createCategories);
router.delete("/:id", deleteCategories);
export default router;
