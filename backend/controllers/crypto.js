const CryptoJS = require("crypto-js");

exports.crypto = async function (req, res) {
  let result = "";
  switch (req.body.obj.algorithm) {
    case "aes":
      result = aes(req.body.method, req.body.obj.file, req.body.obj.key);
      break;
    case "rabbit":
      result = rabbit(req.body.method, req.body.obj.file, req.body.obj.key);
      break;
    case "rc4drop":
      result = rc4drop(req.body.method, req.body.obj.file, req.body.obj.key);
      break;
    default:
      result = "something went wrong parsing which encryption algorithm to use";
  }
  res.status(200).send(result);
};
function aes(process, data, key) {
  let result = "";
  if (process === "encrypt") {
    result = CryptoJS.AES.encrypt(data, key).toString();
  } else if (process === "decrypt") {
    try {
      const decrypted = CryptoJS.AES.decrypt(data, key);
      result = decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      result = error;
    }
  }
  return result;
}
function rabbit(process, data, key) {
  let result = "";
  if (process === "encrypt") {
    result = CryptoJS.Rabbit.encrypt(data, key).toString();
  } else if (process === "decrypt") {
    const decrypted = CryptoJS.Rabbit.decrypt(data, key);
    result = decrypted.toString(CryptoJS.enc.Utf8);
  }
  return result;
}
function rc4drop(process, data, key) {
  let result = "";
  if (process === "encrypt") {
    result = CryptoJS.RC4Drop.encrypt(data, key).toString();
  } else if (process === "decrypt") {
    const decrypted = CryptoJS.RC4Drop.decrypt(data, key);
    result = decrypted.toString(CryptoJS.enc.Utf8);
  }
  return result;
}
