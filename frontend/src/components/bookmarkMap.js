import { randomString } from "../functions/randomString";

import Plus from "../resources/plus.svg";
import Delete from "../resources/favicon.png";

export default function BookmarkMap(props) {
  const header = props.bookmarks;
  const iconID = randomString(2);

  function iconToggler(id) {
    const x = document.getElementById(id);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function openModal() {
    document.getElementById(props.modalID).showModal();
    props.modalSection(props.index);
  }

  return (
    <>
      <div className="headerSubsection">
        <div key={header[0]}>
          <div
            className="headerBox"
            onMouseEnter={() => iconToggler(iconID)}
            onMouseLeave={() => iconToggler(iconID)}
          >
            <p className="linkHeader">{header[0]}</p>
            <img
              src={Plus}
              alt="plus symbol"
              className="icon"
              id={iconID}
              onClick={() => openModal()}
              style={{ display: "none" }}
              title="add new bookmark"
              width="24px"
            />
          </div>
          {header[1].map((entry, index) => {
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
                <a key={entry.name} href={entry.url} className="link">
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
