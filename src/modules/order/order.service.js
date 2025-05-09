const { OrderStatus } = require("../../common/order.const");
const createHttpError = require("http-error");
const { Order, OrderItems } = require("./order.model");
const { Product, ProductColor, ProductSize } = require("../product/product.model");

async function getMyOrderHandler(req, res, next) {
  try {
    const { id: userId } = req.user;
    const { status } = req.query;
    if (!status || !Object.values(OrderStatus).includes(status))
      throw createHttpError(400, "send correct status");
    const orders = await Order.findAll({
      where: { status: status, userId },
    });
    return res.json({
      orders,
    });
  } catch (error) {
    next(error);
  }
}
async function getOrderByIdHandler(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;
      if (!id)
        throw createHttpError(400, "no order founded");
      const order = await Order.findOne({
        where: {  id,userId },
        include:{model:OrderItems,as:"items",include:[
            {
                model:Product,as:"product",
            },
            {
                model:ProductColor,as:"color",
            },
            {
                model:ProductSize,as:"size",
            }
        ]}
      });
      return res.json({
        orders,
      });
    } catch (error) {
      next(error);
    }
  }
module.exports = {
  getMyOrderHandler,
  getOrderByIdHandler
};
