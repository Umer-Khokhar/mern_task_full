import express from "express"
const productRoute = express.Router()
import { getProducts, createProducts, updateProducts, deleteProduct } from "../controllers/product.controllers.js";
import { handleUpload } from "../middleware/multer.js";
productRoute.get("/", getProducts);
// productRoute.get("/:id", getTask);
productRoute.post("/", handleUpload(), createProducts);
productRoute.put("/:id", updateProducts);
productRoute.delete("/:id", deleteProduct);

export default productRoute