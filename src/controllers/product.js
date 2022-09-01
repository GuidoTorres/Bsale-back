const { Op } = require("sequelize");
const { Product } = require("../../config/bd");
const orderElements = require("../utils/orderElements");
const { sizes, pages } = require("../utils/pagination");

const getAllProducts = async (req, res, next) => {
  const { sortBy } = req.query;

  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  try {
    let allProducts = await Product.findAndCountAll({
      limit: sizes(sizeAsNumber),
      offset: +pages(pageAsNumber) * +sizes(sizeAsNumber),
      order: orderElements(sortBy),
    });

    res.status(200).json({
      totalPages: Math.ceil(allProducts.count / sizes(sizeAsNumber)),
      content: allProducts.rows,
    });
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

const searchProduct = async (req, res, next) => {
  const { term, sortBy } = req.query;
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  console.log("searhProduct");
  try {
    if (term) {
      const products = await Product.findAndCountAll({
        where: {
          name: {
            [Op.like]: "%" + term + "%",
          },
        },
        limit: sizes(sizeAsNumber),
        offset: +pages(pageAsNumber) * +sizes(sizeAsNumber),
        raw: true,
        order: orderElements(sortBy),
      });
      console.log(products.count)
      return res.status(200).json({
        totalPages: Math.ceil(products.count / sizes(sizeAsNumber)),
        content: products.rows,
      });
    }
    next()
  } catch (error) {

    res.status(500).json(error)
    console.log(error);
  }
};

module.exports = { getAllProducts, searchProduct };
