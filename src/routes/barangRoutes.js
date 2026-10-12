import { Router } from "express";
import { barang } from "../controllers/barangController.js";
import router from "./authRoutes.js";

const route = Router();

router.get("/", barang);
export default router;
