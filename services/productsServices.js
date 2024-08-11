import { nanoid } from "nanoid";
import fs from "node:fs/promises";
import path from "node:path";
import Product from "../db/models/Product.js";

const productsPath = path.resolve("db", "products.json");

const updateProducts = (products) =>
  fs.writeFile(productsPath, JSON.stringify(products, null, 2));

export const getProducts = () => {
  return Product.findAll();
};

export const addProduct = (data) => Product.create(data);

export const updateById = async (id, data) => {
  const products = await getProducts();
  const index = products.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  products[index] = { ...products[index], ...data };

  await updateProducts(products);

  return products[index];
};

export const deleteById = async (id) => {
  const products = await getProducts();

  const index = products.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const [result] = products.splice(index, 1);

  await updateProducts(products);

  return result;
};

export const updateProductDiscount = async (id, discount) => {
  const products = await getProducts();
  const index = products.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  products[index].discount = discount;

  await updateProducts(products);

  return products[index];
};
