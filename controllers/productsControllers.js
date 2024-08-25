import { response } from "express";
import { createError } from "../helpers/createError.js";
import * as s from "../services/productsServices.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await s.getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const updateProductImages = async (req, res, next) => {
  try {
    res.json(req.files);
    // const productImages = await s.updateById(req.params.id, req.files);
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
