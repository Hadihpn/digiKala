const { OrderStatus } = require("../../common/order.const");
const createHttpError = require("http-error");
const { Order, OrderItems } = require("./order.model");
const {
  Product,
  ProductColor,
  ProductSize,
} = require("../product/product.model");

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
    if (!id) throw createHttpError(400, "no order founded");
    const order = await Order.findOne({
      where: { id, userId },
      include: {
        model: OrderItems,
        as: "items",
        include: [
          {
            model: Product,
            as: "product",
          },
          {
            model: ProductColor,
            as: "color",
          },
          {
            model: ProductSize,
            as: "size",
          },
        ],
      },
    });
    return res.json({
      orders,
    });
  } catch (error) {
    next(error);
  }
}
async function setPackedStatusToOrder(req, res, next) {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) throw createHttpError(400, "no order was found");
    if (order.status !== OrderStatus.InProcess)
      throw createHttpError(400, "at first make a order plz");
    order.status = OrderStatus.Packed;
    await order.save();
    return res.json({
      message: "order packed successfully",
    });
  } catch (error) {
    next(error);
  }
}
async function setInTransitStatusToOrder(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (!order) throw createHttpError(400, "no order was found");
      if (order.status !== OrderStatus.Packed)
        throw createHttpError(400, "at first packed the order plz");
      order.status = OrderStatus.InTransit;
      await order.save();
      return res.json({
        message: "order went for transition successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async function setDeliveredStatusToOrder(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (!order) throw createHttpError(400, "no order was found");
      if (order.status !== OrderStatus.InTransit)
        throw createHttpError(400, "at first pass transition level of order plz");
      order.status = OrderStatus.Delivered;
      await order.save();
      return res.json({
        message: "order delivered successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async function setCanceledStatusToOrder(req, res, next) {
    try {
      const { id } = req.params;
      const {reason} = req.body;
      const order = await Order.findByPk(id);
      if (!order) throw createHttpError(400, "no order was found");
      if (order.status !== OrderStatus.Delivered)
        throw createHttpError(400, "cannot canceled delivered order ");
      order.status = OrderStatus.Canceled;
      order.reason = reason;
      await order.save();
      return res.json({
        message: "order delivered successfully",
      });
    } catch (error) {
      next(error);
    }
  }
module.exports = {
  getMyOrderHandler,
  getOrderByIdHandler,
  setPackedStatusToOrder,
  setInTransitStatusToOrder,
  setDeliveredStatusToOrder,
  setCanceledStatusToOrder
};
