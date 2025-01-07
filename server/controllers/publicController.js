const { Cuisine, Category } = require("../models/");
const { Op } = require('sequelize');

class PublicController {
  static async getAllCuisinesPublic(req, res, next) {
    try {
      console.log(req.query)

      const { filter, sort, page, search } = req.query
      const paramsQuery = {}

      if(filter) {
        paramsQuery.where = {
          categoryId: filter
        }
      }

      if (search) {
        paramsQuery.where = {
          ...paramsQuery.where,
          name: {
            [Op.iLike]: `%${search}%` 
          }
        };
      }

      if(sort) {
        const ordering = sort[0] === '-' ? 'DESC' : 'ASC';
        const column = ordering === 'DESC' ? sort.slice(1) : sort

        paramsQuery.order = [
          [column, ordering]
        ]
        // console.log(ordering, column)
      }

      let limit = 10
      let pageNumber = 1

      if(page) {
        if(page.size) {
          limit = +page.size
          paramsQuery.limit = limit
        }

        if(page.number) {
          pageNumber = +page.number
          paramsQuery.offset =limit * (pageNumber - 1)
        }
      }

      const {rows, count} = await Cuisine.findAndCountAll(paramsQuery)
      res.json({
        page: pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: limit
      })
    } catch (err) {
      // console.log(err);
      next(err)
    }
  }

  static async findCuisineByIdPublic(req, res, next) {
    try {
      const { id } = req.params;
      const dataCuisine = await Cuisine.findByPk(id);

      if (!dataCuisine) {
        throw { name: 'NotFound'}
      }

      res.status(200).json(dataCuisine);
    } catch (err) {
      // console.log(err);
      next(err)
    }
  }

  static async getAllCategoriesPublic(req, res, next) {
    try {
      const dataCategories = await Category.findAll()
      // console.log(dataCategories)

      res.status(200).json(dataCategories)
    } catch (err) {
      // console.log(err);
      next(err)
    }
  }
}

module.exports = PublicController