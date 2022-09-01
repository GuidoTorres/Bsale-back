const { getAllProducts,searchProduct } = require('../controllers/product')

const router = require('express').Router()

router.get("/", getAllProducts)
router.get("/search", searchProduct)
router.get("/:id")

module.exports = router