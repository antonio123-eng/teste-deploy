const router = require("express").Router()
const { showToughts, toughtsDashboard, createToughts, addToughts, deleteTought, updateToughtGet, updateTought } = require("../controllers/ToughtController")


router.get("/", showToughts)
router.get("/dashboard", toughtsDashboard)
router.get("/add", createToughts)
router.post("/add", addToughts)
router.post("/delete", deleteTought)
router.get("/edit/:id", updateToughtGet)
router.post("/edit", updateTought)

module.exports = router