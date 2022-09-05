const { Op } = require("sequelize");
const { Product } = require("../../config/bd");
const orderElements = require("../utils/orderElements");
const { sizes, pages } = require("../utils/pagination");

const getAllProducts = async (req, res, next) => {
  console.log("getAllProducts")
  const { sortBy, prices } = req.query;
  let price = [0, 10000];
  if (prices !== undefined) {
    price = [prices].map((item) => item.split(",")).flat();
  }

  try {
    let allProducts = await Product.findAndCountAll({
      where: {
        price: { [Op.between]: price },
      },
      limit: sizes(req.query),
      offset: +pages(req.query) * +sizes(req.query),
      order: orderElements(sortBy),
    });

    res.status(200).json({
      totalPages: Math.ceil(allProducts.count / sizes(req.query)),
      content: allProducts.rows,
    });
    next();
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const searchProduct = async (req, res, next) => {
    console.log("searchProduct")

  const { term, sortBy, prices } = req.query;

  let price = [0, 10000];
  if (prices !== undefined) {
    price = [prices].map((item) => item.split(",")).flat();
  }
  try {
    if (term) {
      const products = await Product.findAndCountAll({
        where: {
          name: {
            [Op.like]: "%" + term + "%",
          },
          price: { [Op.between]: price },
        },
        limit: sizes(req.query),
        offset: +pages(req.query) * +sizes(req.query),
        raw: true,
        order: orderElements(sortBy),
      });
      console.log(products.count);
      return res.status(200).json({
        totalPages: Math.ceil(products.count / sizes(req.query)),
        content: products.rows,
      });
    }
    next();
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const getProductByCategory = async (req, res, next) => {

    console.log("getproductBycategory")

  const categoryId = req.params.id;
  const { sortBy, prices } = req.query;
  let price = [0, 10000];
  if (prices !== undefined) {
    price = [prices].map((item) => item.split(",")).flat();
  }

  const ids = [categoryId].map((item) => item.split(",")).flat();

  try {
    if (categoryId || sortBy) {
      const products = await Product.findAndCountAll({
        where: {
          category: ids,
        },
        price: { [Op.between]: price },
        limit: sizes(req.query),
        offset: +pages(req.query) * +sizes(req.query),
        raw: true,
        order: orderElements(sortBy),
      });
      return res.status(200).json({
        totalPages: Math.ceil(products.count / sizes(req.query)),
        content: products.rows,
      });
    }
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getProductByCategory, getAllProducts, searchProduct };
