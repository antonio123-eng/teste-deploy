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
app.use(cors({credentials: true,  origin: "http://mozilla.org", methods: "GET, POST, OPTIONS, DELETE, PUT, PATCH", exposedHeaders: "X-My-Custom-Header, X-Another-Custom-Header", allowedHeaders: "X-PINGOTHER, Content-Type"}))

app.listen(port, () => {
   console.log(`Servidor rodando na porta ${port}`)
})