const CryptoJS = require("crypto-js");

exports.decrypt = async function (req, res) {
  const decrypted = aesDecrypt(req.body.obj.file, req.body.obj.key);
  res.status(200).send(decrypted);
};
exports.encrypt = async function (req, res) {
  const encrypted = aesEncrypt(req.body.obj.file, req.body.obj.key);
  res.status(200).send(encrypted);
};
function aesEncrypt(data, key) {
  const encrypted = CryptoJS.AES.encrypt(data, key).toString();
  return encrypted;
}
function aesDecrypt(data, key) {
  const decrypted = CryptoJS.AES.decrypt(data, key);
  const originalText = decrypted.toString(CryptoJS.enc.Utf8);
  return originalText;
}
