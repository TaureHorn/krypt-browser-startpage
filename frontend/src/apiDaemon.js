import axios from "axios";

const URL = "http://localhost:3334";

export class ApiDaemon {
  async authenticate(str) {
    const authAttempt = await axios.post(`${URL}/auth`, { str });
      console.log(authAttempt.status)
    if (authAttempt.status === 200) {
      // window.localStorage.setItem("authToken", authAttempt.data);
      // window.location.reload();
    } else {
      return authAttempt.status;
    }
  }
}
