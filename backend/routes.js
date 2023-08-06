import express from "express";
import UserController from "./controllers/UserController.js";
import ProductController from "./controllers/ProductController.js";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/getProducts", ProductController.getAllProduct);
router.post("/products", ProductController.addProduct);
router.get("/products/:id", ProductController.getProductById);
router.put("/products/:id", ProductController.updateProductById);
router.delete("/products/:id", ProductController.deleteProductById);

export default router;
