const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize.config");
const { ProductTypes } = require("../../common/product.const");
const Product = sequelize.define(
  "product",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { required: true, notEmpty: true },
    },
    price: { type: DataTypes.DECIMAL },
    active_discount: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(ProductTypes)),
      allowNull: false,
    },
    count: { type: DataTypes.INTEGER, defaultValue: 0 },
    description: { type: DataTypes.STRING },
  },
  {
    modelName: "product",
    createdAt: "created_at",
    updatedAt: ":updated_at",
  }
);
const ProductDetail = sequelize.define(
  "product_detail",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    key: { type: DataTypes.STRING },
    value: { type: DataTypes.STRING },
    productId: { type: DataTypes.INTEGER },
  },
  {
    modelName: "product_detail",
    timestamps: false,
  }
);
const ProductColor = sequelize.define(
  "product_color",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    color_name: { type: DataTypes.STRING },
    color_code: { type: DataTypes.STRING },
    color_code: { type: DataTypes.STRING },
    count: { type: DataTypes.INTEGER, defaultValue: 0 },
    price: { type: DataTypes.DECIMAL, defaultValue: 0 },
    discount: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: true },
    active_discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    productId: { type: DataTypes.INTEGER },
  },
  {
    modelName: "product_color",
    timestamps: false,
  }
);
const ProductSize = sequelize.define(
  "product_size",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    size: { type: DataTypes.STRING },
    count: { type: DataTypes.INTEGER, defaultValue: 0 },
    price: { type: DataTypes.DECIMAL, defaultValue: 0 },
    discount: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: true },
    active_discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    productId: { type: DataTypes.INTEGER },
  },
  {
    modelName: "product_size",
    timestamps: false,
  }
);
module.exports = {
  Product,
  ProductDetail,
  ProductColor,
  ProductSize,
};
