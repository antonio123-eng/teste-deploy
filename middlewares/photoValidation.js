const { body } = require("express-validator")


const insertPhotoValidation = () => {

   return [
      body("title")
      .not()
      .equals("undefined")
      .withMessage("O title é obrigatório")
      .isString()
      .withMessage("O titulo é obrigatório")
      .isLength({min: 3})
      .withMessage("O tituto precisa ter ao menos 3 caracteres"),

      body("image").custom((value, {req}) => {
         if(!req.file) {
            throw new Error("A imagem é obrigatória")
         }
         return true
      }),
   ]

}

const updatedPhotoValidation = () => {

   return [
      body("title")
      .optional()
      .isString()
      .withMessage("O titulo é obrigatório")
      .isLength({min: 3})
      .withMessage("O tituto precisa ter ao menos 3 caracteres"),
   ]

}

const commentsPhotoValidation = () => {

   return [
      body("comment").isString().withMessage("O comentário é obrigatório")
   ]

}

module.exports = {
   insertPhotoValidation,
   updatedPhotoValidation,
   commentsPhotoValidation
}