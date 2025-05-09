const { OrderStatus } = require("../../common/order.const");
const createHttpError = require("http-error");
const { Order } = require("./order.model");

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

module.exports = {
  getMyOrderHandler,
};
