require("dotenv").config()
const express = require("express")
const exphbs = require("express-handlebars")
const session = require("express-session")
const FileStore = require("session-file-store")(session)
const path = require("path")
const os = require("os")

const flash = require("express-flash")

const app = express()

const port = process.env.PORT || 3000

const connection = require("./db/connection")

const Tought = require("./models/Tought")
const User = require("./models/User")

// handlebars
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

// receber dados do body
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// sessions
app.set('trust proxy', 1)
app.use(session({
   name: "session",
   secret: "nosso_secret",
   resave: false,
   saveUninitialized: false,
   store: new FileStore({
      logFn: function () {},
      path: path.join(os.tmpdir(), "sessions")
   }),
   cookie: {
      secure: false,
      maxAge: 3600000,
      httpOnly: false
   }
}))

// flash messages
app.use(flash())

// public path
app.use(express.static("public"))

// set seeion to res
app.use((req, res, next) => {
   if(req.session.userid) {
      res.locals.session = req.session
   }
   next()
})

// toughts
const toughtRoutes = require("./routes/toughtsRoutes")
app.use("/toughts", toughtRoutes)

const { showToughts } = require("./controllers/ToughtController")
app.get("/", showToughts)


// routes of authentication
const authRoutes = require("./routes/authRoutes")
app.use("/", authRoutes)

connection.sync().then(() => {
   app.listen(port)
}).catch((error) => {
   console.log(error)
})