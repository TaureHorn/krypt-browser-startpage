const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");

let bookmarksData = "akezamzerak";

exports.decrypt = async function (req, res) {
  console.log(bookmarksData);
  bookmarksData = req.body.obj.bookmarks;
  console.log(bookmarksData);
  const decrypted = aesDecrypt(req.body.obj.bookmarks, req.body.obj.key);
  res.status(200).send(decrypted);
};

exports.encrypt = async function (req, res) {
  const encrypted = aesEncrypt(req.body.obj.bookmarks, req.body.obj.key);
  res.status(200).send(encrypted);
};

function aesEncrypt(data, key) {
  const encrypted = AES.encrypt(data, key).toString();
  return encrypted;
}

function aesDecrypt(data, key) {
  const decrypted = AES.decrypt(data, key);
  const originalText = decrypted.toString(CryptoJS.enc.Utf8);
  return originalText;
}
