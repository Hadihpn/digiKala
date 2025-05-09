const { Basket } = require("../modules/basket/basket.model");
const { Discount } = require("../modules/discount/discount.model");
const { OrderItems, Order } = require("../modules/order/order.model");
const { Payment } = require("../modules/payment/payment.model");
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
  User.hasMany(Basket, { foreignKey: "userId", sourceKey: "id", as: "basket" });
  Product.hasMany(Basket, {
    foreignKey: "productId",
    sourceKey: "id",
    as: "basket",
  });
  ProductColor.hasMany(Basket, {
    foreignKey: "colorId",
    sourceKey: "id",
    as: "basket",
  });
  ProductSize.hasMany(Basket, {
    foreignKey: "sizeId",
    sourceKey: "id",
    as: "basket",
  });
  Basket.belongsTo(User, { foreignKey: "userId", targetKey: "id", as: "user" });
  Basket.belongsTo(Product, {
    foreignKey: "productId",
    targetKey: "id",
    as: "product",
  });
  Basket.belongsTo(ProductColor, {
    foreignKey: "colorId",
    targetKey: "id",
    as: "color",
  });
  Basket.belongsTo(ProductSize, {
    foreignKey: "sizeId",
    targetKey: "id",
    as: "size",
  });
  //#endregion
  //#region Discount
  Discount.hasMany(Basket, {
    foreignKey: "discountId",
    sourceKey: "id",
    as: "basket",
  });
  Basket.belongsTo(Discount, {
    foreignKey: "discountId",
    targetKey: "id",
    as: "basket",
  });
  //#endregion
  //#region Order
  Order.hasMany(OrderItems, {
    foreignKey: "orderId",
    sourceKey: "id",
    as: "items",
  });
  OrderItems.belongsTo(Order, {
    foreignKey: "orderId",
    targetKey: "id",
    as: "order",
  });
  OrderItems.belongsTo(Product, {
    foreignKey: "productId",
    targetKey: "id",
    as: "product",
  });
  OrderItems.belongsTo(ProductColor, {
    foreignKey: "colorId",
    targetKey: "id",
    as: "color",
  });
  OrderItems.belongsTo(ProductSize, {
    foreignKey: "sizeId",
    targetKey: "id",
    as: "size",
  });
  OrderItems.belongsTo(ProductSize, {
    foreignKey: "sizeId",
    targetKey: "id",
    as: "size",
  });

  User.hasMany(Order, { foreignKey: "userId", sourceKey: "id", as: "orders" });
  Order.hasOne(Payment, {
    foreignKey: "orderId",
    sourceKey: "id",
    as: "payment",
    onDelete:"CASCADE"
  });
  Payment.hasOne(Order, {
    foreignKey: "paymentId",
    sourceKey: "id",
    as: "order",
     onDelete:"CASCADE"
  });
  //#endregion
 
  User.hasMany(Payment, { foreignKey: "userId", sourceKey: "id", as: "payment" });

  //#region ROLES
  Role.hasMany(RolePermission, {foreignKey: "roleId", sourceKey: "id", as: "permissions"});
    Permission.hasMany(RolePermission, {foreignKey: "permissionId", sourceKey: "id", as: "roles"});
    RolePermission.belongsTo(Role, {foreignKey: "roleId", targetKey: "id"});
    RolePermission.belongsTo(Permission, {foreignKey: "permissionId", targetKey: "id"});
  //#endregion
  await sequelize.sync({ force: true });
}
module.exports = initDatabase;
