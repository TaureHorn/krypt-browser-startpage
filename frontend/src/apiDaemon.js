import axios from "axios";

const URL = "http://localhost:3334";

export class ApiDaemon {
  async decrypt(obj) {
    const decryptAttempt = await axios.post(`${URL}/decrypt`, { obj });
    if (decryptAttempt.status === 200 && typeof decryptAttempt.data === "object") {
        localStorage.setItem("bookmarks", JSON.stringify(decryptAttempt.data))
        const expiryDate = new Date()
        expiryDate.setDate(expiryDate.getDate() + 7)
        document.cookie = `bookmarksStorage=bookmarksStorage; expires= ${expiryDate.toUTCString()}`
    } else {
      return (decryptAttempt.status, decryptAttempt.data)
    }
  }

    async encrypt(obj) {
        const encryptAttempt = await axios.post(`${URL}/encrypt`, { obj });
        console.log(encryptAttempt.data)
        return encryptAttempt.data
    }
}
