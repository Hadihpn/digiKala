const Authorization = require("../../guard/auhtorization.guard");
const { addToBasketHandler } = require("./basket.service");

const router = require("express").Router();

router.post("/add",Authorization,addToBasketHandler)
module.exports = {
    BasketRoutes:router
}