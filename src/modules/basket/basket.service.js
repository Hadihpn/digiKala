const { ProductTypes } = require("../../common/product.const");
const {
  Product,
  ProductColor,
  ProductSize,
} = require("../product/product.model");
const { Basket } = require("./basket.model");

// const {validate,}
async function addToBasketHandler(req, res, next) {
  const { id: userId = undefined } = req?.user ?? {};
  const { productId, sizeId, colorId } = req.body;
  const product = await Product.findByPk(productId);
  if (!product) throw creartHttpError(404, "not found product");
  const basketItem = {
    productId: product.id,
    userId,
  };
  let productCount, colorCount, sizeCount;
  if (product.type === ProductTypes.Coloring) {
    if (!colorId) throw creartHttpError(404, "send product color detail");
    const productColor = await ProductColor.findByPk(colorId);
    if (!productColor) throw createHttpError(404, " not found color");
    basketItem["colorId"] = colorId;
    colorCount = productColor?.count ?? 0;
    if (colorCount === 0)
      throw createHttpError(400, "product color count not enough");
  } else if (product.type === ProductTypes.Sizing) {
    if (!sizeId) throw creartHttpError(404, "send product size detail");
    const productSize = await ProductSize.findByPk(colorId);
    if (!productColor) throw createHttpError(404, " not found color");
    basketItem["sizeId"] = sizeId;
    sizeCount = productSize?.count ?? 0;
    if (sizeCount === 0)
      throw createHttpError(400, "product size count not enough");
  } else {
    productCount = product?.count;
    if (productCount === 0)
      throw createHttpError(400, "product count not enough");
  }
  const basket = await Basket.findOne({ where: basketItem });
  if (basket) {
      if (sizeCount && sizeCount > basket?.count) {
        basket.count += 1;
      } 
      else if (colorCount && colorCount > basket?.count) {
        basket.count += 1;
      } 
      else if (productCount && productCount > basket?.count) {
        basket.count += 1;
      } else {
        throw createHttpError(400, "productColor count not enough");
      }
      await basket.save()
  } else {
    await Basket.create({ ...basketItem, count: 1 });
  }
}

module.exports = {
    addToBasketHandler
}