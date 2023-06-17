const CryptoJS = require("crypto-js");

function algorithmSelector(algorithm) {
  switch (algorithm) {
    case "rabbit":
      return CryptoJS.Rabbit;
    case "rc4drop":
      return CryptoJS.RC4Drop;
    default:
      return CryptoJS.AES;
  }
}
exports.decrypt = function (req, res) {
  const algorithm = algorithmSelector(req.body.algorithm);
  try {
    const decrypted = algorithm.decrypt(req.body.file, req.body.key);
    res.status(200).send(decrypted.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    res.send(error);
  }
};
exports.encrypt = function (req, res) {
  const algorithm = algorithmSelector(req.body.algorithm);
  try {
    const encrypted = algorithm.encrypt(req.body.file, req.body.key);
    res.status(200).send(encrypted.toString());
  } catch (error) {
    res.send(error);
  }
};

