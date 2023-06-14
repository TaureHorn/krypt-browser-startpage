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
    setDisabled(true);
    const key = e.target.key.value.toString();
    const file = e.target[0].files[0];
    const bookmarks = await fileDataExtractor(file);
    const input = {
      bookmarks: bookmarks,
      key: key,
    };
    if (file.type === "application/json") {
      try {
        daemon.encrypt(input);
      } catch (err) {
        setErrMSG(err);
        document.getElementById("errDialog").showModal();
      }
    } else if (file.type === "text/plain" || file.type === "") {
      try {
        daemon.decrypt(input);
      } catch (err) {
        setErrMSG(err);
        document.getElementById("errDialog").showModal();
      }
    }
  }
  function fileDataExtractor(data) {
    const fileDataReader = new FileReader();
    fileDataReader.readAsText(data, "UTF-8");
    if (data.type === "application/json") {
      return new Promise((resolve) => {
        fileDataReader.onload = (e) => {
          const jsonParser = JSON.parse(e.target.result);
          resolve(JSON.stringify(jsonParser));
        };
      });
    } else if (data.type === "text/plain" || data.type === "") {
      return new Promise((resolve) => {
        fileDataReader.onload = (e) => {
          resolve(e.target.result);
        };
      });
    } else {
      setErrMSG("unsupported file type");
      return "";
    }
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
            <label> key </label>
            <input
              disabled={disabled}
              name="key"
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
