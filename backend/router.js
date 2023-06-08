const express = require("express")
const router = express.Router()

const auth = require("./controllers/auth")
const crypto = require("./controllers/crypto")

router.post("/auth", auth.authenticate)
router.post("/check", crypto.check)

module.exports = router
