require("dotenv").config()
import express, { urlencoded, json} from "express"
import { engine } from "express-handlebars"
import session from "express-session"
const FileStore = require("session-file-store")(session)
import { join } from "path"
import { tmpdir } from "os"

import flash from "express-flash"

const app = express()

const port = process.env.PORT || 3000

import connection from "./db/connection"

import Tought from "./models/Tought"
import User from "./models/User"

// handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")

// receber dados do body
app.use(urlencoded({extended: true}))
app.use(json())

// sessions
app.set('trust proxy', 1)
app.use(session({
   name: "session",
   secret: "nosso_secret",
   resave: false,
   saveUninitialized: false,
   store: new FileStore({
      logFn: function () {},
      path: join(tmpdir(), "sessions")
   }),
   cookie: {
      secure: true,
      maxAge: 3600000
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
import toughtRoutes from "./routes/toughtsRoutes"
app.use("/toughts", toughtRoutes)

import { showToughts } from "./controllers/ToughtController"
app.get("/", showToughts)


// routes of authentication
import authRoutes from "./routes/authRoutes"
app.use("/", authRoutes)

connection.sync().then(() => {
   app.listen(port)
}).catch((error) => {
   console.log(error)
})