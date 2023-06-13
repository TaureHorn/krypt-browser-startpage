import "./App.scss";

import { useState } from "react";

import { ApiDaemon } from "./apiDaemon";

import Bookmarks from "./components/bookmarks";
import Uploader from "./components/uploader"

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
      <Uploader daemon={daemon} />
    </>
  );
}

export default App;
