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
    } else if (colorCount && colorCount > basket?.count) {
      basket.count += 1;
    } else if (productCount && productCount > basket?.count) {
      basket.count += 1;
    } else {
      throw createHttpError(400, "productColor count not enough");
    }
    await basket.save();
  } else {
    await Basket.create({ ...basketItem, count: 1 });
  }
}
async function getUserBasket(req, res, next) {
  try {
    const { id: userId } = req.user;
const userBasket = await getUserBasketByUserId(userId)
    return res.json(userBasket);
  } catch (error) {
    next(error);
  }
}
async function getUserBasketByUserId(userId) {
  const baskets = await Basket.findAll({
    where: { userId },
    include: [
      { model: { Product, as: "product" } },
      { model: { ProductColor, as: "color" } },
      { model: { ProductSize, as: "size" } },
    ],
  });
  if(baskets.length==0) throw createHttpError(400,"your basket is empty")
  const totalAmount = 0;
  const totalDiscount = 0;
  const finalAmount = 0;
  const finalBasket = [];
  for (const item of baskets) {
    const { product, size, color, count } = item;
    const productIndex = finalBasket.findIndex(
      (item) => item.id === product.id
    );
    let productData = finalBasket.find((item) => item.id === product.id);
    if (!productData) {
      productData = {
        id: product.id,
        title: product.title,
        price: product.price,
        type: product.type,
        count,
        colors: [],
        sizes: [],
      };
    } else {
      productData.cout += count;
    }

    if (product?.type === ProductTypes.Coloring && color) {
      let price = color?.price * count;
      totalAmount += price;
      let discountAmount = 0;
      let finalPrice = price;
      if (color?.active_discount && color.discount > 0) {
        discountAmount = color?.price * (color?.discount / 100);
        totalDiscount += discountAmount;
      }
      finalPrice = price - discountAmount;
      finalAmount += finalPrice;
      productData["colors"].push({
        id: color.id,
        color_name: color?.color_name,
        color_code: color?.color_code,
        count,
        price,
        discountAmount,
        finalPrice,
      });
    } else if (product?.type === ProductTypes.Sizing && size) {
      let price = size?.price * count;
      totalAmount += price;
      let discountAmount = 0;
      let finalPrice = price;
      if (size?.active_discount && size.discount > 0) {
        discountAmount = color?.price * (size?.discount / 100);
        totalDiscount += discountAmount;
      }
      finalPrice = price - discountAmount;
      finalAmount += finalPrice;
      productData["sizes"].push({
        id: color.id,
        size_name: color?.size_name,
        size_code: color?.size_code,
        count,
        price,
        discountAmount,
        finalPrice,
      });
    } else if (product?.type === ProductTypes.Single && product) {
      let price = product?.price * count;
      totalAmount += price;
      let discountAmount = 0;
      let finalPrice = price;
      if (product?.active_discount && product.discount > 0) {
        discountAmount = product?.price * (product?.discount / 100);
        totalDiscount += discountAmount;
      }
      finalPrice = price - discountAmount;
      finalAmount += finalPrice;
      productData["sizes"].push({
        id: color.id,
        size_name: color?.size_name,
        size_code: color?.size_code,
        count,
        price,
        discountAmount,
        finalPrice,
      });
      productData["finalPrice"] = finalPrice;
      productData["discountAmount"] = discountAmount;
    }
    if (productIndex > -1) {
      finalBasket[productIndex] = productData;
    } else {
      finalBasket.push(productData);
    }
  }
  return {
    totalAmount,
    totalDiscount,
    finalAmount,
    baskets: finalBasket,
  };
}
module.exports = {
  addToBasketHandler,
  getUserBasket,
  getUserBasketByUserId
};
