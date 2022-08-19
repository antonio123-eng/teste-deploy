require("dotenv").config()
const express = require("express")
const exphbs = require("express-handlebars")


const app = express()

const port = process.env.PORT || 3000

const connection = require("./db/connection")

const Tought = require("./models/Tought")

// handlebars
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

// receber dados do body
app.use(express.urlencoded({extended: true}))
app.use(express.json())


// public path
app.use(express.static("public"))


// toughts
const toughtRoutes = require("./routes/toughtsRoutes")
app.use("/toughts", toughtRoutes)

const { showToughts } = require("./controllers/ToughtController")
app.get("/", showToughts)

connection.sync().then(() => {
   app.listen(port)
}).catch((error) => {
   console.log(error)
})