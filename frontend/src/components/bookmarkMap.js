import { randomString } from "../functions/randomString";

import Plus from "../resources/plus.svg";
import Delete from "../resources/favicon.png";

export default function BookmarkMap(props) {
  const header = props.bookmarks;
  const iconID = randomString(3);

  function sortEntriesByName(a, b) {
    const nameOne = a.name.toLowerCase();
    const nameTwo = b.name.toLowerCase();
    let comparison = 0;
    if (nameOne > nameTwo) {
      comparison = 1;
    } else if (nameOne < nameTwo) {
      comparison = -1;
    }
    return comparison;
  }
  const entries = header[1].sort(sortEntriesByName);

  function openModal() {
    document.getElementById(props.modalID).showModal();
    props.modalSection(props.index);
  }

  return (
    <>
      <div className="headerSubsection">
        <div key={header[0]}>
          <div className="headerBox">
            <p className="linkHeader">{header[0]}</p>
            <img
              src={Plus}
              alt="plus symbol"
              className="icon"
              id={iconID}
              onClick={() => openModal()}
              title="add new bookmark"
              width="24px"
            />
          </div>
          {entries.map((entry, index) => {
            return (
              <div key={randomString(4)} className="linkEntry">
                <img
                  src={Delete}
                  alt="delete entry button"
                  className="deleteButton"
                  onClick={() =>
                    props.deletion({ category: props.index, position: index })
                  }
                  style={
                    props.deleteMode
                      ? { display: "block" }
                      : { display: "none" }
                  }
                  title="delete entry"
                />
                <a
                  key={entry.name}
                  href={entry.url}
                  className="link"
                  target="_blank"
                  rel="noreferer"
                >
                  <p style={{ padding: "10px" }} className="link">
                    {entry.name}
                  </p>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
