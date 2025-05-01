const { ProductRoutes } = require("./modules/product/product.routes")

const router = require("express").Router()
router.use("/product",ProductRoutes)

module.exports = {
    mainRoutes:router
}