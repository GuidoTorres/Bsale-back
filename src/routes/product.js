const { getAllProducts,searchProduct, getProductByCategory } = require('../controllers/product')

const router = require('express').Router()

router.get("/", getAllProducts)
router.get("/search", searchProduct)
router.get("/:id", getProductByCategory)

module.exports = router