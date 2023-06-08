import "./App.scss";

import { useState } from "react";

import { ApiDaemon } from "./apiDaemon";

import Authenticator from "./components/authentication";
import Bookmarks from "./components/bookmarks";

function App() {
  const daemon = new ApiDaemon();

  const [authToken, setAuthToken] = useState(
    window.localStorage.getItem("authToken")
  );

  return authToken ? (
    <>
      <Bookmarks daemon={daemon} />
    </>
  ) : (
    <>
      <Authenticator daemon={daemon} />
    </>
  );
}

export default App;
