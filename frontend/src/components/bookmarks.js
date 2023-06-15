import { useNavigate } from "react-router-dom";

export default function Bookmarks(props) {
  const navigate = useNavigate();
  const display = Object.entries(props.bookmarks);

  function manualBookmarkDelete() {
    document.cookie = "bookmarksStorage=removed";
    window.location.reload();
  }

  return (
    <>
      <div className="textCenter">
        <div className="linksBox">
          {display.map((header) => {
            return (
              <>
                <div key={header[0]}>
                  <p className="linkHeader">{header[0]}</p>
                  {header[1].map((entry) => {
                    return (
                      <a key={entry.name} href={entry.url} className="link">
                        <p>{entry.name}</p>
                      </a>
                    );
                  })}
                </div>
              </>
            );
          })}
          <div id="dataInteractionButtons" className="dataButtons"></div>
        </div>
        <button className="widebutton" onClick={() => navigate("/encrypt")}>
          encrypt new file
        </button>
        <button className="widebutton" onClick={() => manualBookmarkDelete()}>
          remove data from memory
        </button>
      </div>
    </>
  );
}
