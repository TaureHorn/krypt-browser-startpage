import axios from "axios";

const URL = "http://localhost:3334";
const FileSaver = require("file-saver");

export class ApiDaemon {
  async decrypt(obj) {
    const method = "decrypt";
    const decryptAttempt = await axios.post(`${URL}/crypto`, { obj, method });
    const dataChecker = Object.keys(decryptAttempt.data).length > 0;
    if (decryptAttempt.status === "200" && dataChecker === true) {
      this.dataPusher(decryptAttempt);
      return decryptAttempt.data;
    } else {
        console.log(decryptAttempt)
      return decryptAttempt.data;
    }
  }

  async encrypt(obj) {
    const method = "encrypt";
    const encryptAttempt = await axios.post(`${URL}/crypto`, { obj, method });
    return encryptAttempt.data;
  }

  async downloader(file, name, algorithm) {
    const fileToDownload = new File([file], `${name}.${algorithm}`, {
      type: "text/plain",
    });
    FileSaver.saveAs(fileToDownload);
  }
  dataPusher(data) {
    localStorage.setItem("bookmarks", JSON.stringify(data.data));
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    document.cookie = `bookmarksStorage=bookmarksStorage; expires= ${expiryDate.toUTCString()}`;
  }
}
