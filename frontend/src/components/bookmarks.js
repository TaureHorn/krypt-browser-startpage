import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Bookmarks(props) {
  const navigate = useNavigate();
  const display = Object.entries(props.bookmarks);
  const [validData, setValidData] = useState("");

  useEffect(() => {
    if (typeof display !== "object") {
      setValidData(false);
    } else {
      setValidData(true);
    }
  }, [display]);

  function manualBookmarkDelete() {
    document.cookie = "bookmarksStorage=removed; sameSite=Strict";
      props.removeBookmarks("")
  }

  function jsonDownloader() {
    const data = JSON.stringify(props.bookmarks);
    props.daemon.downloader(data, "links", "json");
  }

  return validData === true ? (
    <>
      <div className="textCenter">
        <div className="linksBox">
          {display.map((header) => {
            return (
              <>
                <div key={header[0]}>
                  <p className="linkHeader">{header[0]}</p>
                  <div className="headerSubsection">
                    {header[1].map((entry) => {
                      return (
                        <a key={entry.name} href={entry.url} className="link">
                          <p style={{ padding: "10px" }} className="link">
                            {entry.name}
                          </p>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div id="dataInteractionButtons" className="dataButtons">
        <button className="lowerButton" onClick={() => navigate("/encrypt")}>
          encrypt new file
        </button>
        <button className="lowerButton" onClick={() => manualBookmarkDelete()}>
          remove data from memory
        </button>
        <button className="lowerButton" onClick={() => jsonDownloader()}>
          download unencrypted json
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
