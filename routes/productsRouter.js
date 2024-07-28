import { Router } from "express";

import * as c from "../controllers/productsControllers.js";

const productsRouter = Router();
productsRouter.get("/", c.getProducts);

export default productsRouter;
