const express = require('express')
const CategoryController = require('../controllers/categoryController')
const router = express.Router()


router.post('/', CategoryController.addCategory)
router.get('/', CategoryController.getAllCategories)

router.put('/:id', CategoryController.updateCategory)

module.exports = router