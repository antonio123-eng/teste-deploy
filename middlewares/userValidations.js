const { body } = require('express-validator')

const userCreateValidation = () => {

   return [
      body("name").isString().withMessage("O nome é obrigatório").isLength({min: 3}).withMessage("O nome precisa ter ao menos 3 caracteres."),

      body("email").isString().withMessage("O e-mail é obrigatório").isEmail().withMessage("Insira um e-mail válido"),

      body("password").isString().withMessage("A senha é obrigatória").isLength({min: 4}).withMessage("A senha precisa ter ao menos 4 caracteres."),

      body("confirmpassword").isString().withMessage("A confirmação de senha é obrgatória").custom((value, {req}) => {
         if(value != req.body.password) {
            throw new Error("A senha e a confirmação de senha precisam ser iguais!")
         }
         return true
      })

   ]

}


const userLoginValidation = () => {

   return [
      body("email").isString().withMessage("O e-mail é obrigatório").isEmail().withMessage("Insira um e-mail válido"),
      body("password").isString().withMessage("A senha é obrigatória")
   ]

}


const userUpdateValidation = () => {

   return [
      body("name").optional().isLength({min: 3}).withMessage("O nome precisa ter ao menos 3 caracteres"),
      body("password").optional().isLength({min: 4}).withMessage("A senha precisa ter ao menos 4 caracteres")
   ]

}


module.exports  = {
   userCreateValidation,
   userLoginValidation,
   userUpdateValidation
}