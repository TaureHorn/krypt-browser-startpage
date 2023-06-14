import { randomString } from "../functions/randomString.js"

export default function Bookmarks(props) {
    const display = Object.entries(props.bookmarks)
    console.log(display)

    function manualBookmarkDelete(){
        document.cookie = "bookmarksStorage=removed"
        window.location.reload()
    }

  return (
    <>
      <div className="contCenter">
        {display.map(entry => {
            const rand = randomString(6)
          return <p id={rand} key={rand}>{entry[0]}</p>;
        })}

      </div>
        <button> encrypt data to file</button>
      <button onClick={() => manualBookmarkDelete()}>remove data from memory</button>
    </>
  );
}
