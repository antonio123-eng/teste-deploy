const authCheckUser = (req, res, next) => {

   const userExists = req.session.userid

   if(!userExists) {
      res.redirect("/login")
   }

   next()

}

module.exports = authCheckUser