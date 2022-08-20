require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')


const port = process.env.PORT || 5000


const app = express()
// config json and form data response
app.use(express.urlencoded({extended: false}))
app.use(express.json())


// routes

// Users
const userRouter = require('./routes/UserRoutes')
app.use("/api/users", userRouter)

// Photos
const photoRoutes = require('./routes/PhotoRoutes')
app.use("/api/photos", photoRoutes)

const { getAllPhotos } = require("./controllers/PhotoController")
app.get("/", getAllPhotos)

// db connection
require('./config/db.js')

// upload
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// cors
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*")
   res.header(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested, Content-Type, Accept Authorization"
   )
   if (req.method === "OPTIONS") {
     res.header(
       "Access-Control-Allow-Methods",
       "POST, PUT, PATCH, GET, DELETE"
     )
     return res.status(200).json({})
   }
   next()
 })


app.listen(port, () => {
   console.log(`Servidor rodando na porta ${port}`)
})