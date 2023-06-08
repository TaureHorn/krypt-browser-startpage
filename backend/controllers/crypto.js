const crypto = require("crypto-js")

exports.check = function(req, res) {
    console.log(req.body)
    res.send("Checker worked")
}
