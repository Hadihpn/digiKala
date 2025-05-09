const { getMyOrderHandler } = require("./order.service")
const Authorization = require("../../guard/auhtorization.guard");

const router = require("express").Router()
router.get("/",Authorization,getMyOrderHandler)
module.exports  ={
    OrderRoutes :router
}