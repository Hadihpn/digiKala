const { validate, Joi } = require("express-validation");
const { ProductTypes } = require("../../common/product.const");
const createProductionValidation = validate({
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(null),
    type: Joi.string()
      .valid(...Object.values(ProductTypes))
      .required(),
    price: Joi.number().optional().allow(null),
    discount: Joi.number().optional().allow(null),
    active_discount: Joi.boolean().optional().allow(null),
    count: Joi.number().optional().allow(null),
    details: Joi.array().items(
      Joi.object({
        key: Joi.string().required(),
        value: Joi.string().required(),
      })
    ).optional()
    ,
    colors: Joi.array().items(
      Joi.object({
        color_name: Joi.string().required(),
        color_code: Joi.string().required(),
        price: Joi.number().required(),
        discount: Joi.number().optional().allow(null),
        active_discount: Joi.boolean().optional().allow(null),
        count: Joi.number().optional().allow(null),
      })
    ).optional()    ,
    sizes: Joi.array().items(
        Joi.object({
          size: Joi.string().required(),
          price: Joi.number().required(),
          discount: Joi.number().optional().allow(null),
          active_discount: Joi.boolean().optional().allow(null),
          count: Joi.number().optional().allow(null),
        })
      ).optional()
  }),
});
module.exports = {createProductionValidation}