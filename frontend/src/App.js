import "./App.scss";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { ApiDaemon } from "./apiDaemon";

import Bookmarks from "./components/bookmarks";
import Encrypter from "./components/encrypter";
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
      try {
        setBookmarks(JSON.parse(localStorage.getItem("bookmarks")));
      } catch (err) {
        console.log("error");
        setBookmarks(err);
      }
    }
  }, []);

  return bookmarks ? (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Bookmarks
              bookmarks={bookmarks}
              removeBookmarks={(bookmarks) => setBookmarks(bookmarks)}
              daemon={daemon}
            />
          }
        />
        <Route path="/encrypt" element={<Encrypter daemon={daemon} />} />
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
