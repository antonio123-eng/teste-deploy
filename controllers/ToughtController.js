const Tought = require("../models/Tought")
const User = require("../models/User")
const { Op } = require("sequelize")

const showToughts = async(req, res) => {

   let search = ''
   if(req.query.search) {
      search = req.query.search
   }

   let order = 'DESC'

   if(req.query.order === "old") {
      order = "ASC"
   } else {
      order = "DESC"
   }

   const toughts = await Tought.findAll({include: User, 
      where: {
         title: {[Op.like]: `%${search}%`}
      },
      order: [["createdAt", order]]
   })

   const toughtsValues = toughts.map((result) => result.get({plain: true}))

   let toughtsQty = toughtsValues.length

   if(toughtsQty === 0) {
      toughtsQty = false
   }
   
   res.render("toughts/home", {toughtsValues, search, toughtsQty})
}

const toughtsDashboard = async(req, res) => {
   const userLoged = req.session.userid

   // check user exists
   const user = await User.findOne({
      where: 
      {
         id: userLoged
      }, 
      include: Tought, 
      plain: true
   })

   if(!user) {
      res.redirect("/login")
   }

   const toughtsUser = user.Toughts.map((result) => result.dataValues)
   let toughtsUserVazia = false
   if(toughtsUser.length === 0) {
      toughtsUserVazia = true
   }
   res.render("toughts/dashboard", {toughtsUser, toughtsUserVazia})
}

const createToughts = (req, res) => {
   res.render("toughts/createTought")
}


const addToughts = async(req, res) => {

   const {title} = req.body

   const userLoged = req.session.userid

   const user = await User.findOne({where: {id: userLoged}})

   if(!user) {
      req.flash("message", "Usuário não autenticado!")
      req.render("/toughts/add")
      return
   }

   const tought = {
      title,
      userId: user.id
   }

   try {
      await Tought.create(tought)
      req.flash("message", "Pensamento criado com sucesso!")
      req.session.save(() => {
         res.redirect("/toughts/dashboard")
      })
      // quando for usar o redirect tem que salvar a sessão
   } catch (error) {
      console.log(error)
   }

}


const deleteTought = async (req, res) => {

   const id = req.body.id
   const userLoged = req.session.userid

  try {
   await Tought.destroy({where: {id: id, userId: userLoged}})

   req.flash("message", "Pensamento deletado com sucesso!")
   req.session.save(() => {
      res.redirect("/toughts/dashboard")
   })
 
  } catch (error) {
     console.log(error)
  }

}


const updateToughtGet = async (req, res) => {

   const id = req.params.id

   const tought = await Tought.findOne({raw: true, where: {id: id}})

   res.render("toughts/editTought", {tought})

}


const updateTought = async(req, res) => {

   const id = req.body.id
   const title = req.body.title

   const tought = {
      title
   }
   

   try {
      await Tought.update(tought, {where: {id: id}})
      //tem que mandar o primeiro parametro em formato de objeto  == tought
      req.flash("message", "Pensamento atualizado com sucesso!")
      req.session.save(() => {
         res.redirect("/toughts/dashboard")
      })
   } catch (error) {
      console.log(error)
   }


}


module.exports = {
   showToughts,
   toughtsDashboard,
   createToughts,
   addToughts,
   deleteTought,
   updateToughtGet,
   updateTought
}