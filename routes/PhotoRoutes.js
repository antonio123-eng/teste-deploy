const router = require('express').Router()

// Controller



// Middlewares
const { insertPhotoValidation, updatedPhotoValidation, commentsPhotoValidation } = require('../middlewares/photoValidation')
const authGuard = require('../middlewares/authGuard')
const validate = require("../middlewares/handleValidation")
const { imageUpload } = require('../middlewares/imageUpload')
const { insertPhoto, deletePhoto, getAllPhotos, getPhotosUser, getPhoto, updatedPhoto, likePhoto, commentPhoto, searchPhotos } = require('../controllers/PhotoController')


// routes
router.post("/", authGuard, imageUpload.single("image"), insertPhotoValidation(), validate, insertPhoto)
router.delete('/:id', authGuard, deletePhoto)
router.get("/", authGuard, getAllPhotos)
router.get("/user/:id", authGuard, getPhotosUser)

// rota de busca
router.get("/search", authGuard, searchPhotos)

router.get("/:id", authGuard, getPhoto)
router.put("/:id", authGuard, updatedPhotoValidation(), validate, updatedPhoto)
router.put("/like/:id", authGuard, likePhoto)
router.put("/comment/:id", authGuard, commentsPhotoValidation(), validate, commentPhoto)

module.exports = router