const { createProductHandler, getProductHandler, getProductByIdHandler } = require("./product.services");
const { createProductionValidation } = require("./validation");

const router = require("express").Router();
router.post("/create",createProductionValidation,createProductHandler)
router.get("/   ",getProductHandler)
router.get("/:id",getProductByIdHandler)
module.exports = { 
    ProductRoutes:router
}