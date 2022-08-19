const router = require("express").Router()
const { showToughts, toughtsDashboard, createToughts, addToughts, deleteTought, updateToughtGet, updateTought } = require("../controllers/ToughtController")

const authCheckUser = require("../helpers/auth")

router.get("/", showToughts)
router.get("/dashboard", authCheckUser, toughtsDashboard)
router.get("/add", authCheckUser, createToughts)
router.post("/add", authCheckUser, addToughts)
router.post("/delete", authCheckUser, deleteTought)
router.get("/edit/:id", authCheckUser, updateToughtGet)
router.post("/edit", authCheckUser, updateTought)

module.exports = router