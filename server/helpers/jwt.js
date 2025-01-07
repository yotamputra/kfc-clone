const jwt = require('jsonwebtoken')

const secret = process.env.SECRET

const signToken = (payload) => {
  console.log(secret)
  return jwt.sign(payload, secret)
}

const verifyToken = (token) => {
  return jwt.verify(token, secret)
}

module.exports = { signToken, verifyToken }