const express = require("express")
const router = express.Router()

const crypto = require("./controllers/crypto")

router.post("/crypto/decrypt", crypto.decrypt)
router.post("/crypto/encrypt", crypto.encrypt)

module.exports = router
