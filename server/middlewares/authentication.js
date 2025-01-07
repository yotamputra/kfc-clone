const { User } = require("../models/");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    // 1. Check Token
    const bearerToken = req.headers.authorization;

    // console.log(bearerToken)

    if (!bearerToken) {
      throw { name: "Unauthorized" };
    }

    // 2. Verify Token
    const token = bearerToken.split(" ")[1];
    const verified = verifyToken(token);

    // 3. Find User
    const user = await User.findByPk(verified.id);

    if (!user) {
      throw { name: "Unauthorized" };
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (err) {
    console.log(err)
    next(err)
  }
};

module.exports = authentication;
