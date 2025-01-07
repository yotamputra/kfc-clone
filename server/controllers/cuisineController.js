const { Cuisine, User } = require("../models/");
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


class CuisineController {
  static async getAllCuisines(req, res, next) {
    try {
      const cuisines = await Cuisine.findAll({
        include: {
          model: User,
          attributes: { exclude: ['password'] }
        }
      });

      res.status(200).json(cuisines);
    } catch (err) {
      // console.log(err);
      next(err)
    }
  }

  static async addCuisine(req, res, next) {
    try {
      const { name, description, price, imgUrl, categoryId } =
        req.body;
      // console.log(req.body)
      const newCuisine = await Cuisine.create({
        name,
        description,
        price,
        imgUrl,
        categoryId,
        authorId: req.user.id
      });
      

      res.status(201).json(newCuisine);
    } catch (err) {
      // console.log(err);
      next(err)
    }
  }

  static async findCuisineById(req, res, next) {
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

  static async updateCuisine(req, res, next) {
    try {
      const {id} = req.params
      const cuisine = await Cuisine.findByPk(+id)

      if (!cuisine) {
        throw { name: "NotFound"}
      }
      // console.log(req.params)
      // console.log(req.body)

      const {name, description, price, imgUrl, categoryId, authorId} = req.body

      // console.log(id)

      const updatedCuisine = await Cuisine.update({name, description, price, imgUrl, categoryId, authorId}, 
        {
          where: {id: +id},
          returning: true
        },
      )

      // console.log(updatedCuisine)

      res.status(200).json(updatedCuisine[1])
    } catch (err) {
      // console.log(err)
      next(err)
    }
  }

  static async deleteCuisine (req, res, next) {
    try {
      const {id} = req.params
      const cuisine = await Cuisine.findByPk(id)

      if (!cuisine) {
        throw { name: 'NotFound' }
      }

      await Cuisine.destroy({
        where: {
          id: id
        }
      })

      res.status(200).json({
        message: `${cuisine.name} deleted successfully`
      })
    } catch (err) {
      // console.log(err)
      next(err)
    }
  }

  static async uploadImage(req, res, next) {
    try {
      const b64File = Buffer.from(req.file.buffer).toString('base64')

      const dataURI = `data:${req.file.mimetype};base64,${b64File}`

      const uploadFile = await cloudinary.uploader.upload(dataURI, {
        resource_type: 'auto',
        folder: 'restaurant_app',
      })

      const imgUrl = uploadFile.secure_url

      const updated = await Cuisine.update({
        imgUrl
      }, {
        where: {
          id: req.params.id
        },
        returning: true
      })

      if (!updated) {
        throw { name: 'NotFound'}
      }

      // console.log(updated[1][0].name)

      res.status(200).json({
        message: `Image ${updated[1][0].name} success to update`
      })
    } catch (err) {
      // console.log(err)
      next(err)
    }
  } 
}

module.exports = CuisineController;
