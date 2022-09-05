const { Sequelize, DataTypes } = require("sequelize");

const categoryModel = require("../src/models/category")
const productModel = require("../src/models/product")

const DB_URI = process.env.DB_URI;

const sequelize = new Sequelize("bsale_test","bsale_test","bsale_test",{

  host: DB_URI,
  dialect: "mysql",
  define: { timestamps: false },
  pool: {
    max: 5, 
    min: 0,
    acquire: 10000,
    idle: 10000
  },
});

const Category = categoryModel(sequelize, DataTypes)
const Product = productModel(sequelize, DataTypes)

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("autnticado correctamente");
  } catch (error) {
    console.log(error);
  }
};

dbConnection()

module.exports = {Category, Product}

