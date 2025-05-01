const e = require("express");
const { ProductTypes } = require("../../common/product.const");
const createHttpError = require("http-error");
const statusCodes = require("http-status-codes");
const { ProductDetail, ProductSize } = require("./product.model");
async function create(req, res, next) {
  try {
    const {
      title,
      description,
      type,
      price=undefined,
      discount=undefined,
      active_discount=undefined,
      count=undefined,
      details,
      colors,
      sizes,
    } = req.body;
    if (!type || !Object.values(ProductTypes).includes(type)) {
      throw createHttpError(statusCodes.OK, "Invalid product type");
    }
    const product = await Product.create({
      title,
      description,
      price,
      type,
      discount,
      active_discount,
      count
    });
    if (details && Array.isArray(details)) {
      const detailsList = [];
      for (const element of details) {
        detailsList.push({
          key: element.key,
          value: element.value,
          productId: product._id,
        });
        if (detailsList.length > 0) {
          await ProductDetail.bulkCreate(detailsList);
        }
      }
      if (type === ProductTypes.Coloring) {
        if (colors && Array.isArray(colors)) {
          const colorsList = [];
          for (const element of colors) {
            colorsList.push({
              color_name: element.name,
              color_code: element.code,
              price:element.price,
              discount:element.discount,
              active_discount:element.active_discount,
              count:element.count,
              productId: product._id,
            });
            if (colorsList.length > 0) {
              await ProductColor.bulkCreate(colorsList);
            }
          }
        }
      }
      if (type === ProductTypes.Sizing) {
        if (sizes && Array.isArray(sizes)) {
          const sizeList = [];
          for (const element of colors) {
            sizeList.push({
              size: element.name,
              price:element.price,
              discount:element.discount,
              active_discount:element.active_discount,
              count:element.count,
              productId: product._id,
            });
            if (sizeList.length > 0) {
              await ProductSize.bulkCreate(sizeList);
            }
          }
        }
      }
    }
  } catch (error) {
    next(error);
  }
}
