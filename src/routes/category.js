const { getAllCategories } = require('../controllers/category')

const router = require('express').Router()
const categories = getAllCategories

router.get("/", categories)

module.exports = router