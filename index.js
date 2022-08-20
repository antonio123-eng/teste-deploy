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
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", 'https://teste-deploy-frontend.herokuapp.com/');
   res.header("Access-Control-Allow-Credentials", true);
   res .header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content -Type,Accept,content-type,application/json');
   next();
})


app.listen(port, () => {
   console.log(`Servidor rodando na porta ${port}`)
})