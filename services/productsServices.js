import { nanoid } from "nanoid";
import fs from "node:fs/promises";
import path from "node:path";

const productsPath = path.resolve("db", "products.json");

const updateProducts = (products) =>
  fs.writeFile(productsPath, JSON.stringify(products, null, 2));

export const getProducts = async () => {
  const data = await fs.readFile(productsPath, "utf-8");
  return JSON.parse(data);
};

/* export const getMovieById = async (id) => {
  const movies = await getMovies();
  const result = movies.find((item) => item.id === id);

  return result || null;
}; */

export const addProduct = async (data) => {
  const products = await getProducts();

  const newProduct = {
    id: nanoid(),
    ...data,
    discount: 0,
  };

  products.push(newProduct);

  await updateProducts(products);

  return newProduct;
};

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
