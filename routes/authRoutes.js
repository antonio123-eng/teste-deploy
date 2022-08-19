const router = require("express").Router()
const { login, register, registerPost, logout, loginPost } = require("../controllers/AuthController")

router.get("/login", login)
router.get("/register", register)
router.post("/register", registerPost)
router.get("/logout", logout)
router.post("/login", loginPost)

module.exports = router