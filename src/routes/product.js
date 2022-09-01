const { getAllProducts } = require('../controllers/product')

const router = require('express').Router()

router.get("/", getAllProducts)
router.get("/search")
router.get("/:id")

module.exports = router