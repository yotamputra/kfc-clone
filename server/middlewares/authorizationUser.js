const authorization = async (req, res, next) => {
  try {
    // console.log(req.user)

    if(req.user.role != 'Admin') {
      throw { name: "Forbidden" }
    }

    next()
  } catch (err) {
    console.log(err)
    next(err)
  }
};

module.exports = authorization