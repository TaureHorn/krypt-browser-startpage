import axios from "axios";

const URL = "http://localhost:3334";

export class ApiDaemon {
  async decrypt(obj) {
    const decryptAttempt = await axios.post(`${URL}/decrypt`, { obj });
    if (decryptAttempt.status === 200) {
        console.log(decryptAttempt.data)
    } else {
      return typeof decryptAttempt.status;
    }
  }

    async encrypt(obj) {
        const encryptAttempt = await axios.post(`${URL}/encrypt`, { obj });
        console.log(encryptAttempt.data)
    }
}
