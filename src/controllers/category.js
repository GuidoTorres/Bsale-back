const {Category} = require('../../config/bd')

const getAllCategories = async(req, res, next) => {

    try {
        const allCategories = await Category.findAll();
        res.status(200).json(allCategories)
        next()
        
    } catch (error) {

        res.status(500).json(error)
        
    }

}

module.exports = {getAllCategories}