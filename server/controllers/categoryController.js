const { Category } = require("../models/");

class CategoryController {
  static async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll()
  
      res.status(200).json(categories)
    } catch(err) {
      res.status(500).json({
        message: "Internal Server Error"
      })
    }
  }

  static async addCategory(req, res) {
    try {
      const {name} = req.body
      // console.log(req.body)

      const newCategory = await Category.create({name})

      res.status(200).json(newCategory)
    } catch (err) {
      console.log(err);
      if (err.name === "SequelizeValidationError") {
        res.status(400).json({
          message: err.errors[0].message,
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

  static async updateCategory(req, res) {
    try {
      const {id} = req.params
      const category = await Category.findByPk(+id)

      if (!category) {
        throw { name: "NotFound"}
      }

      const {name} = req.body

      // console.log(req.body)

      const updatedCategory = await Category.update({name}, 
        {
          where: {id: +id},
          returning: true
        },
      )

      // console.log(updatedCategory)

      res.status(200).json(updatedCategory[1])
    } catch (err) {
      console.log(err)
      if (err.name === "NotFound") {
        res.status(404).json({
          message: "Error Not Found",
        })
      } else if (err.name === "SequelizeValidationError") {
          res.status(400).json({
            message: err.errors[0].message,
          });
      } else {
          res.status(500).json({
            message: "Internal Server Error",
          });
      }
    }
  }
}

module.exports = CategoryController