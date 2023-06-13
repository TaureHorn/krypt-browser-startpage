const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");

exports.decrypt = async function (req, res) {
  const received = {
    data: req.body.obj.file,
    key: req.body.obj.key,
  };
  const decrypted = aesDecrypt(received.data, received.key);
  res.status(200).send(decrypted);
};

exports.encrypt = async function (req, res) {
  const received = {
    data: JSON.stringify(req.body.obj.bookmarks),
    key: req.body.obj.hash,
  };
  const encrypted = aesEncrypt(received.data, received.key);
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
