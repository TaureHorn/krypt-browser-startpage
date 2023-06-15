import { randomString } from "../functions/randomString.js";

export default function Bookmarks(props) {
  const display = Object.entries(props.bookmarks);
  console.log(display);

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
        </div>
        <div id="dataInteractionButtons" className="dataButtons">
          <button> encrypt data to file</button>
          <button onClick={() => manualBookmarkDelete()}>
            remove data from memory
          </button>
        </div>
      </div>
    </>
  );
}
