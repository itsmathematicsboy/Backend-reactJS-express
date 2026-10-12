import express from "express";
import cors from "cors";

import { login } from "./controllers/AuthController.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import categoriesRoutes from "./routes/categoriesRoutes.js";
import produkRoutes from "./routes/productRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", produkRoutes);
// app.post("/api/auth/login", login);

app.get("/", (req, res) => {
  res.json({ message: "welcome to POS API" });
});

export default app;
