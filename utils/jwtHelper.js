var jwt = require('jsonwebtoken')
const config = require('../config/config')
require('dotenv').config()

class JWTHelper {
  constructor () {
    this.JWT_SECRET = process.env.JWT_SECRET
    this.PUBLIC_KEY = process.env.PUBLIC_KEY
    this.PRIVATE_KEY = process.env.PRIVATE_KEY
  }

  sign = payload => {
    return jwt.sign(payload, this.PRIVATE_KEY, { expiresIn: 30000 })
  }
  verify = token => {
    return jwt.verify(token, this.PRIVATE_KEY, (err, token) => {
      if (err) {
        return err
      } else {
        return token
      }
    })
  }

  decode = token => {
    return jwt.decode(token, { complete: true })
  }
}

module.exports = new JWTHelper()