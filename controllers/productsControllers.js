import * as s from "../services/productsServices.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await s.getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};
