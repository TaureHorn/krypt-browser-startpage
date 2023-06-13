import { useState } from "react";

export default function Uploader(props) {
  const daemon = props.daemon;
  const [message, setMessage] = useState(
    "Upload your bookmarks to display them"
  );
  const [disabled, setDisabled] = useState(false);
  const [errMSG, setErrMSG] = useState("");

  async function dataPusher(e) {
    e.preventDefault();
    // setDisabled(true);
    const hash = e.target.hash.value.toString();
    const bookmarks = await jsonExtractor(e.target[0].files[0]);
    const input = {
      bookmarks: bookmarks,
      hash: hash,
    };
    try {
      daemon.encrypt(input);
    } catch (err) {
      setErrMSG(err);
      document.getElementById("errDialog").showModal();
    }
  }

  function jsonExtractor(data) {
    const JSONReader = new FileReader();
    JSONReader.readAsText(data, "UTF-8");
    return new Promise((resolve) => {
      JSONReader.onload = (e) => {
        resolve(JSON.parse(e.target.result));
      };
    });
  }

  return (
    <>
      <dialog id="errDialog" open={false}>
        {errMSG}
        <button
          onClick={() => {
            setErrMSG("");
            document.getElementById("errDialog").close();
          }}
        >
          x
        </button>
      </dialog>
      {/*////////////////////////////////////////////////////////////////////////////////////////////*/}
      <div className="contCenter">
        <div className="textCenter">
          <h1>{message}</h1>
          <form onSubmit={(e) => dataPusher(e)}>
            <label> file </label>
            <input
              disabled={disabled}
              name="bookmarksFile"
              required
              type="file"
            />
            <label> hash </label>
            <input
              disabled={disabled}
              name="hash"
              placeholder="********"
              required
              type="password"
            />
            <button style={{ display: "none" }} type="submit">
              o
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
