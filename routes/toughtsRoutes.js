const router = require("express").Router()
const { showToughts, createToughts, deleteTought, updateToughtGet, updateTought } = require("../controllers/ToughtController")


router.get("/", showToughts)
router.get("/add", createToughts)
router.post("/delete", deleteTought)
router.get("/edit/:id", updateToughtGet)
router.post("/edit", updateTought)

module.exports = router