const { default: mongoose } = require("mongoose")
const Photo = require("../models/Photo")
const User = require("../models/User")


const insertPhoto = async (req, res) => {

   const {title} = req.body
   const image = req.file.filename

   const reqUser = req.user
   
   const user = await User.findById(reqUser._id)

   const newPhoto  = await Photo.create({
      image,
      title,
      userId: user._id,
      userName: user.name
   })

   if(!newPhoto) {
      return res.status(422).json({erros: ["Houve um erro, tente novamente mais tarde!"]})
   }

   return res.status(201).json(newPhoto)

}



const deletePhoto = async (req, res) => {

   const {id} = req.params
   const reqUser = req.user

  try {
      const photo = await Photo.findById(mongoose.Types.ObjectId(id))

      if(!photo) {
         return res.status(404).json({erros: ["Foto não ecnontrada"]})
      }

      if(!photo.userId.equals(reqUser._id)) {
         return res.status(422).json({erros: ["Ocorreu um erro, tente novamente mais tarde"]})
      }

      await Photo.findByIdAndDelete(photo._id)

      return res.json({id: photo._id, message: "Foto excluída com sucesso"})

  } catch (error) {
   return res.status(404).json({erros: ["Foto não ecnontrada"]})
  }

}


const getAllPhotos = async (req, res) => {

   const photos = await Photo.find().sort([["createdAt", -1]]).exec()

   return res.json(photos)

}


const getPhotosUser = async (req, res) => {

   const {id} = req.params

   const photosUser = await Photo.find({userId: id}).sort([["createdAt", -1]]).exec()

   if(photosUser.length === 0) {
      return res.status(422).json({erros: ["O usuário não possui nenhuma foto"]})
   }
   
   return res.json(photosUser)

}



const getPhoto = async(req, res) => {

   const {id} = req.params

   const photo = await Photo.findById(mongoose.Types.ObjectId(id))
   if(!photo) {
      return res.status(404).json({erros: ["Foto não encontrada"]})
   }

   return res.json(photo)

}


const updatedPhoto = async (req, res) => {

   const {id} = req.params
   const {title} = req.body

   const reqUser = req.user

   const photo  = await Photo.findById(mongoose.Types.ObjectId(id))
   // check photo exists
   if(!photo) {
      return res.status(404).json({erros: ["Foto não encontrada"]})
   }

   // check photo belongs to user
   if(!photo.userId.equals(reqUser._id)) {
      return res.status(422).json({erros: ["Ocorreu um erro, tente novamente mais tarde"]})
   }

   if(title) {
      photo.title = title
   }

   await photo.save()

  return res.json({photo, message: "Foto atualizada com sucesso!"})

}



const likePhoto = async (req, res) => {

   const { id } = req.params
   
   const reqUser = req.user

   const photo = await Photo.findById(id)
   if(!photo) {
      return res.status(404).json({erros: ["Foto não encontrada"]})
   }

   if(photo.likes.includes(reqUser._id)) {
      return res.status(422).json({erros: ["Você já curtiu essa foto"]})
   }

   photo.likes.push(reqUser._id)

   await photo.save()

   return res.json({photoId: id, userId: reqUser._id, message: "A foto foi curtida"})

}



const commentPhoto = async (req, res) => {

   const { id } = req.params
   const { comment } = req.body

   const reqUser = req.user

   const user = await User.findById(reqUser._id)

   const photo = await Photo.findById(id)
   if(!photo) {
      return res.status(404).json({erros: ["Foto não encontrada"]})
   }

   const commentUser = {
      userId: user._id,
      userName: user.name,
      userImage: user.profileImage,
      comment
   }

   photo.comments.push(commentUser)

   await photo.save()

   return res.json({comment: commentUser, messgae: "A foto foi comentada com sucesso"})

}



const searchPhotos = async (req, res) => {

   const { q } = req.query

   const photos = await Photo.find({title: new RegExp(q, "i")}).exec()

   return res.json(photos)

}



module.exports = {
   insertPhoto,
   deletePhoto,
   getAllPhotos,
   getPhotosUser,
   getPhoto,
   updatedPhoto,
   likePhoto,
   commentPhoto,
   searchPhotos
}