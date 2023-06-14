import "./App.scss";

import { useEffect, useState } from "react";

import { ApiDaemon } from "./apiDaemon";

import Bookmarks from "./components/bookmarks";
import Uploader from "./components/uploader";

function App() {
  const daemon = new ApiDaemon();
  const [bookmarks, setBookmarks] = useState("");

  useEffect(() => {
    let cookies = [];
    if (document.cookie === "") {
      return;
    } else {
      cookies = document.cookie.split("; ");
    }
    if (!cookies.includes("bookmarksStorage=bookmarksStorage")) {
      localStorage.removeItem("bookmarks");
    } else if (bookmarks === "") {
      setBookmarks(JSON.parse(localStorage.getItem("bookmarks")));
    }
  }, []);

  return bookmarks ? (
    <>
      <Bookmarks bookmarks={bookmarks} daemon={daemon} />
    </>
  ) : (
    <>
      <Uploader daemon={daemon} />
    </>
  );
}

export default App;
