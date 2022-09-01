const { Op } = require("sequelize");
const { Product } = require("../../config/bd");
const orderElements = require("../utils/orderElements");
const { sizes, pages } = require("../utils/pagination");

const getAllProducts = async (req, res, next) => {
  const { sortBy } = req.query;

  try {
    let allProducts = await Product.findAndCountAll({
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
  }
};

const searchProduct = async (req, res, next) => {
  const { term, sortBy } = req.query;


  console.log("searhProduct");
  try {
    if (term) {
      const products = await Product.findAndCountAll({
        where: {
          name: {
            [Op.like]: "%" + term + "%",
          },
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
  const categoryId = req.params.id;
  const { sortBy } = req.query;

  try {
    if (categoryId || sortBy) {
      const products = await Product.findAndCountAll({
        where: {
          category: categoryId,
        },
        limit: sizes(req.query),
        offset: +pages(req.query) * +sizes(req.query),
        raw: true,
        order: orderElements(sortBy),
      });
      return res
        .status(200)
        .json({
          totalPages: Math.ceil((products.count / sizes(req.query))),
          content: products.rows,
        });
    }
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getProductByCategory , getAllProducts, searchProduct };
