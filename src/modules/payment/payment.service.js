const { OrderStatus } = require("../../common/order.const");
const {
  getUserBasket,
  getUserBasketByUserId,
} = require("../basket/basket.service");
const { Order, OrderItems } = require("../order/order.model");
const { Payment } = require("./payment.model");

async function paymentBasketHanlder(req, res, next) {
  try {
    const { id: userId } = req.user;
    const { basket, totalAmount, finalAmount, totalDiscount } =
      await getUserBasketByUserId(userId);
    const payment = await Payment.create({
      userId,
      status: false,
      amount: finalAmount,
    });
    const order = await Order.create({
      userId,
      paymentId: payment.id,
      total_amount: totalAmount,
      final_amount: finalAmount,
      discount_amount: totalDiscount,
      status: OrderStatus.Pending,
      address: "Tehran tehran Azadi",
    });
    payment.orderId = order.id;
    await payment.save();
    let orderList = [];
    for (const item of basket) {
      orderList.push({
        orderId: order.id,
        productId: item?.productId,
        sizeId: item?.sizeId,
        colorId: itemm?.colorId,
        count: item?.count,
      });
    }
    await OrderItems.bulkCreate(orderList);
    return res.json({
      paymentUrl: "https://",
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
    paymentBasketHanlder
}