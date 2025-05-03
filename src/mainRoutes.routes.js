const { AuthRoutes } = require("./modules/auth/auth.routes")
const { ProductRoutes } = require("./modules/product/product.routes")

const router = require("express").Router()
router.use("/product",ProductRoutes)
router.use("/auth",AuthRoutes)

module.exports = {
    mainRoutes:router
}