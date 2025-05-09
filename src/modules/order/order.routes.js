const { getMyOrderHandler, getOrderByIdHandler } = require("./order.service")
const Authorization = require("../../guard/auhtorization.guard");

const router = require("express").Router()
router.get("/",Authorization,getMyOrderHandler)
router.get("/:id",Authorization,getOrderByIdHandler)
module.exports  ={
    OrderRoutes :router
}