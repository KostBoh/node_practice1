import { log } from "console";
import { createError } from "../helpers/createError.js";
import * as s from "../services/productsServices.js";
import fs from "fs/promises";
import path from "path";

export const getProducts = async (req, res, next) => {
  try {
    const products = await s.getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProductImagesPath = (filename) =>
  path.resolve("public", "products", filename);

export const updateProductImages = async (req, res, next) => {
  try {
    const promisesArr = req.files.map(async (file) => {
      const oldPath = file.path;
      const newPath = getProductImagesPath(file.filename);
      await fs.rename(oldPath, newPath);
      return path.join("products", file.filename);
    });
    const result = await Promise.allSettled(promisesArr);
    const data = result.map(({ value }) => value);
    // const productImages = await s.updateById(req.params.id, { images: data });
    // res.json(productImages);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const product = await s.addProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await s.deleteById(req.params.id);

    if (!product) {
      throw createError(404, "Product not found");
    }

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await s.updateById(req.params.id, req.body);

    if (!product) {
      throw createError(404, "Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProductDiscount = async (req, res, next) => {
  try {
    const product = await s.updateProductDiscount(
      req.params.id,
      req.body.discount
    );

    if (!product) {
      throw createError(404, "Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
