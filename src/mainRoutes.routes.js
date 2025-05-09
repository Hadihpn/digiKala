const { AuthRoutes } = require("./modules/auth/auth.routes")
const { BasketRoutes } = require("./modules/basket/basket.routes")
const { OrderRoutes } = require("./modules/order/order.routes")
const { PaymentRoutes } = require("./modules/payment/payment.routes")
const { ProductRoutes } = require("./modules/product/product.routes")

const router = require("express").Router()
router.use("/product",ProductRoutes)
router.use("/auth",AuthRoutes)
router.use("/basket",BasketRoutes)
router.use("/order",OrderRoutes)
router.use("/payment",PaymentRoutes)

module.exports = {
    mainRoutes:router
}