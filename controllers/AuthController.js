// const Tought = require("../models/Tought")
const User = require("../models/User")
const bcrypt = require("bcryptjs")


const register = async(req, res) => {
   res.render("auth/register")
}

const registerPost = async(req, res) => {

   const {name, email, password, confirmPassword} = req.body

   if(password !== confirmPassword) {
      req.flash("message", "A senha e a confirmação de senha precisam ser iguais")
      res.render("auth/register")
      return
   }

   // emails exists
   const userExists = await User.findOne({ where: {email: email} })
   if(userExists) {
      req.flash("message", "E-mail já cadastrado, por favor utilize outro e-mail")
      res.render("auth/register")
      return
   }

   // create a password
   const salt = await bcrypt.genSalt()
   const passwordHash = await bcrypt.hash(password, salt)

   const user = {
      name,
      email,
      password: passwordHash
   }

   try {
      const createUser = await User.create(user)

      req.session.userid = createUser.id

      req.flash("message", "Cadastro realizado com sucesso!")
      
      req.session.save(() => {
         res.redirect("/")
      })

   } catch (error) {
      console.log(error)
   }

}


const login = async(req, res) => {
   res.render("auth/login")
}


const loginPost = async(req, res) => {
   const {email, password} = req.body

   const userExists = await User.findOne({where: {email: email}})
   if(!userExists) {
      req.flash("message", "Usuário não econtrado!")
      res.render("auth/login")
      return 
   }

   const verifyPassword = await bcrypt.compare(password, userExists.password)
   if(!verifyPassword) {
      req.flash("message", "Senha inválida!")
      res.render("auth/login")
      return 
   }

   req.session.userid = userExists.id
   req.flash("message", "Usuário logado com sucesso!")
   req.session.save(() => {
      res.redirect("/")
   })

}


const logout = (req, res) => {
   req.session.destroy()
   res.redirect("/login")
}




module.exports = {
   login,
   register,
   registerPost,
   logout,
   loginPost
}