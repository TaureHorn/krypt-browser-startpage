import "./App.scss";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { ApiDaemon } from "./apiDaemon";

import Bookmarks from "./components/bookmarksPage";
import Encrypter from "./components/encrypter";
import Uploader from "./components/uploader";

function App() {
  const daemon = new ApiDaemon();
  const [bookmarks, setBookmarks] = useState("");
  const [preloadBookmarksForEncryption, setBookmarkPreload] = useState(false);

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
      try {
        setBookmarks(JSON.parse(localStorage.getItem("bookmarks")));
      } catch (err) {
        console.log("error");
        setBookmarks(err);
      }
    }
  }, []);

  useEffect(() => {
    if (bookmarks === "" && document.cooke === "") {
      return;
    }
    const str = JSON.stringify(bookmarks);
    if (str === localStorage.getItem("bookmarks")) {
      return;
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  return bookmarks ? (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Bookmarks
              bookmarks={bookmarks}
              daemon={daemon}
              presetFile={(preload) => setBookmarkPreload(preload)}
              updateBookmarks={(bookmarks) => setBookmarks(bookmarks)}
            />
          }
        />
        <Route
          path="/encrypt"
          element={
            <Encrypter
              daemon={daemon}
              preloadFile={preloadBookmarksForEncryption}
            />
          }
        />
      </Routes>
    </>
  ) : (
    <>
      <Uploader
        bookmarks={(bookmarks) => setBookmarks(bookmarks)}
        daemon={daemon}
      />
    </>
  );
}

export default App;
