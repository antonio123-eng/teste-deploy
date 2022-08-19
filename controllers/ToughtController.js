const Tought = require("../models/Tought")
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

   const toughts = await Tought.findAll({
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


const createToughts = (req, res) => {
   res.render("toughts/createTought")
}

const deleteTought = async (req, res) => {

   const id = req.body.id


  try {
   await Tought.destroy({where: {id: id}})

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
   createToughts,
   deleteTought,
   updateToughtGet,
   updateTought
}