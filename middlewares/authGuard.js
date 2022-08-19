const User = require('../models/User')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET


const authGuard = async(req, res, next) => {

   const bearer = req.headers["authorization"]
   const token = bearer && bearer.split(" ")[1]

   // check token exists
   if(!token) return res.status(401).json ({erros: ["Acesso negado!"]})

   // check token is valid
   try {
      const verified = jwt.verify(token, jwtSecret)
      req.user = await User.findById(verified.id).select("-password")
      next()
   } catch (error) {
      return res.status(401).json({erros: ["Token inválido"]})
   }

}

module.exports = authGuard