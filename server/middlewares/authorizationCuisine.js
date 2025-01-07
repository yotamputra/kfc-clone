const { Cuisine } = require("../models/");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cuisine = await Cuisine.findByPk(id);
    if (!cuisine) {
      throw { name: "NotFound" };
    }

    // console.log(cuisine)
    // console.log(req.user, 'INI USER')

    if(req.user.role != 'Admin') {
      if(cuisine.authorId !== req.user.id) {
        throw { name: "Forbidden" }
      }
    }

    next()
  } catch (err) {
    console.log(err)
    next(err)
  }
};

module.exports = authorization