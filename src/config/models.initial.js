const { Basket } = require("../modules/basket/basket.model");
const {
  Product,
  ProductDetail,
  ProductColor,
  ProductSize,
} = require("../modules/product/product.model");
const { User, Otp } = require("../modules/user/user.model");
const sequelize = require("./sequelize.config");
async function initDatabase() {
  //#region Product
  Product.hasMany(ProductDetail, {
    foreignKey: "productId",
    sourceKey: "id",
    as: "details",
  });
  ProductDetail.belongsTo(Product, {
    foreignKey: "productId",
    targetKey: "id",
  });
  Product.hasMany(ProductColor, {
    foreignKey: "productId",
    sourceKey: "id",
    as: "colors",
  });
  ProductDetail.belongsTo(Product, {
    foreignKey: "productId",
    targetKey: "id",
  });
  Product.hasMany(ProductSize, {
    foreignKey: "productId",
    sourceKey: "id",
    as: "sizes",
  });
  ProductSize.belongsTo(Product, { foreignKey: "productId", targetKey: "id" });
  //#endregion
  //#region  User
  User.hasOne(Otp, { foreignKey: "userId", sourceKey: "id", as: "otp" });
  Otp.hasOne(User, { foreignKey: "otpId", sourceKey: "id", as: "otp" });
  Otp.belongsTo(User, { foreignKey: "userId", targetKey: "id" });
  //#endregion
  //#region Basket
  User.hasMany(Basket,{foreignKey:"userId",sourceKey:"id", as: "basket"})
  Product.hasMany(Basket,{foreignKey:"productId",sourceKey:"id", as: "basket"})
  ProductColor.hasMany(Basket,{foreignKey:"colorId",sourceKey:"id", as: "color"})
  ProductSize.hasMany(Basket,{foreignKey:"sizeId",sourceKey:"id", as: "size"})
  Basket.belongsTo(User,{foreignKey:"userId",targetKey:"id",as:"user"})
  Basket.belongsTo(Product,{foreignKey:"productId",targetKey:"id",as:"product"})
  Basket.belongsTo(ProductColor,{foreignKey:"colorId",targetKey:"id",as:"color"})
  Basket.belongsTo(ProductSize,{foreignKey:"sizeId",targetKey:"id",as:"size"})
  //#endregion
  await sequelize.sync({ force: true });
}
module.exports = initDatabase;
