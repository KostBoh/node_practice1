import { Router } from "express";
import * as c from "../controllers/productsControllers.js";
import { validateDiscount } from "../middlewares/validateProducts.js";
import { upload } from "../middlewares/upload.js";

const productsRouter = Router();
productsRouter.get("/", c.getProducts);
productsRouter.post("/", c.addProduct);
productsRouter.delete("/:id", c.deleteProduct);
productsRouter.patch("/:id", c.updateProduct);
productsRouter.patch(
  "/:id/images",
  upload.array("images", 4),
  c.updateProductImages
);
productsRouter.patch(
  "/:id/discount",
  validateDiscount,
  c.updateProductDiscount
);

export default productsRouter;
