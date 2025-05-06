const Authorization = require("../../guard/auhtorization.guard");
const { addToBasketHandler, getUserBasket } = require("./basket.service");

const router = require("express").Router();

router.post("/add",Authorization,addToBasketHandler)
router.post("/",Authorization,getUserBasket)
module.exports = {
    BasketRoutes:router
}