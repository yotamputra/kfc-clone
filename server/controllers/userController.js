const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/");

class UserController {
  static async register(req, res) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const newUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address
      });

      res.status(201).json({
        username: newUser.username,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        address: newUser.address
      });
    } catch (err) {
      console.log(err);
      if (
        err.name === "SequelizeUniqueConstraintError" ||
        err.name === "SequelizeValidationError"
      ) {
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

  static async login(req, res) {
    try {
      // 1. Check 
      const {email, password} = req.body

      // console.log(req.body)
      if(!email) {
        throw { name: "EmailRequired" }
      }

      if(!password) {
        throw { name: "PasswordRequired" }
      }

      // 2. Find User
      const user = await User.findOne({
        where: {
          email
        }
      })

      if(!user) {
        throw { name: "Unauthenticated" }
      }

      // 3. Compare
      const compared = comparePass(password, user.password)

      if(!compared) {
        throw { name: "Unauthenticated" }
      }

      // 4. Create Token
      const access_token = signToken({ id: user.id })

      res.status(200).json({ access_token })
    } catch(err) {
      console.log(err)
      if(err.name === 'EmailRequired') {
        res.status(400).json({
          message: "Email is required"
        })
      } else if(err.name === 'PasswordRequired') {
        res.status(400).json({
          message: "Password is required"
        })
      } else if(err.name === "Unauthenticated") {
        res.status(401).json({
          message: "Error invalid username or email or password"
        })
      } else {
        res.status(500).json({
          message: "Internal Server Error"
        })
      }
    }
  }
}

module.exports = UserController