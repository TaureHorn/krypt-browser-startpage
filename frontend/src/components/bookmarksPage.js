import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { isObjectEmpty } from "../functions/isObjectEmpty";
import { randomString } from "../functions/randomString";

import BookmarkMap from "./bookmarkMap";

export default function Bookmarks(props) {
  const navigate = useNavigate();
  // modal ///////////////////////////////////////////////////////////////////////////
  const modalID = "addNewBookmarkModal";
  const [modalSection, setModalSection] = useState("");

  const [deleteMode, setDeleteMode] = useState(false);
  const [deletion, markForDeletion] = useState("");
  function toggleDeleteMode() {
    const e = document.querySelectorAll(".deleteButton");
    if (deleteMode === false) {
      setDeleteMode(true);
      e.forEach((a) => (a.style.display = "block"));
    } else if (deleteMode === true) {
      setDeleteMode(false);
      e.forEach((a) => (a.style.display = "none"));
    }
  }
  function deleteEntry() {
    display[deletion.category][1].splice(deletion.position, 1);
    updateDataMap(dataMapper());
    props.updateBookmarks(Object.fromEntries(display));
  }
  useEffect(() => {
    if (isObjectEmpty(deletion) === false) {
      deleteEntry();
    }
  }, [deletion]);
  // data ///////////////////////////////////////////////////////////////////////////
  const display = Object.entries(props.bookmarks);
  const [dataMap, updateDataMap] = useState(dataMapper());
  const [validData, setValidData] = useState("");

  useEffect(() => {
    if (typeof display !== "object") {
      setValidData(false);
    } else {
      setValidData(true);
    }
  }, [display]);

  // functions ////////////////////////////////////////////////////////////////////////
  function dataMapper() {
    return display.map((header, index) => {
      return (
        <BookmarkMap
          bookmarks={header}
          deleteMode={deleteMode}
          deletion={(deletion) => markForDeletion(deletion)}
          index={index}
          key={randomString(4)}
          modalID={modalID}
          modalSection={(modalSection) => setModalSection(modalSection)}
        />
      );
    });
  }
  function submitNewBookmark(e) {
    e.preventDefault();
    const newBookmark = {
      name: e.target.name.value,
      url: e.target.url.value,
    };
    display[modalSection][1].push(newBookmark);
    updateDataMap(dataMapper());
    props.updateBookmarks(Object.fromEntries(display));
    document.getElementById("newBookmarkForm").reset();
    document.getElementById(modalID).close();
  }
  function manualBookmarkDelete() {
    document.cookie = "bookmarksStorage=removed; sameSite=Strict";
    props.updateBookmarks("");
  }

  function jsonDownloader() {
    const data = JSON.stringify(props.bookmarks);
    props.daemon.downloader(data, "links", "json");
  }
  return validData ? (
    <>
      {/*/////////////// MODAL /////////////////////////////////////////////////////*/}
      <dialog closed="true" id={modalID} className="dialog">
        <form
          method="dialog"
          id="newBookmarkForm"
          className="formInputs"
          onSubmit={(e) => submitNewBookmark(e)}
        >
          <label>name:</label>
          <input name="name" type="text" required />
          <label>url:</label>
          <input name="url" type="text" required />
          <button type="submit" className="border">
            add new bookmark
          </button>
        </form>
      </dialog>
      {/*/////////////// MAP /////////////////////////////////////////////////////*/}
      <div id="alerter">
        <p className="alerter padding">
          {deleteMode ? <>delete mode enabled</> : <>krypt</>}
        </p>
      </div>
      <div className="textCenter">
        <div className="linksBox">{dataMap}</div>
      </div>
      <div id="dataInteractionButtons" className="dataButtons">
        <button
          className="lowerButton"
          onClick={() => {
            props.presetFile(true);
            navigate("encrypt");
          }}
        >
          encrypt current bookmarks
        </button>
        <button
          className="lowerButton"
          onClick={() => {
            props.presetFile(false);
            navigate("/encrypt");
          }}
        >
          encrypt new file
        </button>
        <button className="lowerButton" onClick={() => toggleDeleteMode()}>
          {deleteMode ? <>disable</> : <>enable</>} delete mode
        </button>
        <button className="lowerButton" onClick={() => jsonDownloader()}>
          download unencrypted json
        </button>
        <button className="lowerButton" onClick={() => manualBookmarkDelete()}>
          remove data from memory
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="textCenter">
        <p>
          Invalid data. Data does not appear to be valid JSON format. Or, if
          using AES encryption, you may have typed in the wrong key.
        </p>
        <button className="lowerButton" onClick={() => manualBookmarkDelete()}>
          reupload data
        </button>
      </div>
    </>
  );
}
