import axios from "axios";

import { isObjectEmpty } from "./functions/isObjectEmpty";

const URL = "http://localhost:3334";
const FileSaver = require("file-saver");

export class ApiDaemon {
  async decrypt(algorithm, file, key) {
    let decrypt = "";
    try {
      decrypt = await axios.post(`${URL}/crypto/decrypt`, {
        algorithm,
        file,
        key,
      });
    } catch (error) {
      decrypt = error.message;
    }
    const dataChecker = isObjectEmpty(decrypt.data);
    if (decrypt.status === 200 && dataChecker === false) {
      this.dataPusher(decrypt);
      return decrypt.data;
    } else {
      return decrypt;
    }
  }

  async encrypt(algorithm, file, key) {
    try {
      const encryptAttempt = await axios.post(`${URL}/crypto/encrypt`, {
        algorithm,
        file,
        key,
      });
      return encryptAttempt.data;
    } catch (error) {
      return error.message;
    }
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
    document.cookie = `bookmarksStorage=bookmarksStorage; expires= ${expiryDate.toUTCString()}; sameSite=Strict`;
  }
}
