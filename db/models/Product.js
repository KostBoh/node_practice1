import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Product = sequelize.define("product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  discount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

// Product.sync();

export default Product;
