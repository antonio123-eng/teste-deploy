const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { default: mongoose, mongo } = require('mongoose')

const jwtSecret = process.env.JWT_SECRET


// generate user token
const generateUserToken = (id) => {
   return jwt.sign({id}, jwtSecret, {
      expiresIn: "3d"
   })
}


// register user
const register = async(req, res) => {
   
   const {name, email, password} = req.body

   // check user exists
   const userExists = await User.findOne({email})
   if(userExists) {
      return res.status(422).json({erros: ["Email já cadastrado no sistema, por favor utilize outro e-mail!"]})
   }

   // generate password hash
   const salt = await bcrypt.genSalt()
   const passwordHash = await bcrypt.hash(password, salt)

   const newUser = await User.create({
      name, 
      email,
      password: passwordHash
   })

   if(!newUser) {
      return res.status(422).json({erros: ["Ocorreu um erro, por favor tente novamente mais tarde"]})
   }

   return res.status(201).json({
      _id: newUser._id,
      token: generateUserToken(newUser._id)
   })

}


const login = async(req, res) => {

   const { email, password } = req.body

   // check user exists
   const user = await User.findOne({email})
   if(!user) {
      return res.status(404).json({erros: ["Não existe usuário com este e-mail, por favor utilize outro e-mail"]})
   }

   // check password
   const checkPassword = await bcrypt.compare(password, user.password)
   if(!checkPassword) {
      return res.status(422).json({erros: ["Senha inválida!"]})
   }

   return res.status(201).json({
      _id: user._id,
      profileImage: user.profileImage,
      token: generateUserToken(user._id)
   })

}


const getCurrentUser = async (req, res) => {
   const user = req.user
   console.log(user)

   return res.status(200).json(user)

}


const update = async(req, res) => {
   
   const {name, password, bio} = req.body

   let profileImage = null
   console.log(req.file)
   if(req.file) {
      profileImage = req.file.filename
   }

   const reqUser = req.user
   const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select("-password")

   if(name) {
      user.name = name
   }

   if(password) {
      const salt = await bcrypt.genSalt()
      const passwordHash = await bcrypt.hash(password, salt)

      user.password = passwordHash
   }

   if(profileImage) {
      user.profileImage = profileImage
   }

   if(bio) {
      user.bio = bio
   }

   await user.save()

   return res.json(user)

}



const getUserById = async(req, res) => {

   const {id} = req.params

   try {
      const user = await User.findById(mongoose.Types.ObjectId(id)).select("-password")

      if(!user) {
         return res.status(404).json({erros: ["Usuário não encontrado!"]})
      }
      return res.json(user)
   } catch (error) {
      return res.status(404).json({erros: ["Usuário não encontrado!"]})
   }

}


module.exports = {
   register,
   login,
   getCurrentUser,
   update,
   getUserById
}
