const { getMyOrderHandler, getOrderByIdHandler, setPackedStatusToOrder, setInTransitStatusToOrder, setDeliveredStatusToOrder, setCanceledStatusToOrder } = require("./order.service")
const Authorization = require("../../guard/auhtorization.guard");

const router = require("express").Router()
router.patch("/set-packed/:id",Authorization,setPackedStatusToOrder)
router.patch("/set-in-transition/:id",Authorization,setInTransitStatusToOrder)
router.patch("/set-deliverd/:id",Authorization,setDeliveredStatusToOrder)
router.patch("/set-canceled/:id",Authorization,setCanceledStatusToOrder)
router.get("/",Authorization,getMyOrderHandler)
router.get("/:id",Authorization,getOrderByIdHandler)
module.exports  ={
    OrderRoutes :router
}