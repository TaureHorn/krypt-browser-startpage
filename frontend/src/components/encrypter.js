import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fileDataExtractor } from "../functions/fileDataHandler";

import FileForm from "./fileForm";

export default function Encrypter(props) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("encrypt a file");
  const [formData, setFormData] = useState("");

  const [fileReceived, setFileReceived] = useState(false);
  const [file, setFile] = useState("");

  async function dataUploader() {
    const bookmarks = await fileDataExtractor(formData[0].files[0]);
    const extractedFormData = {
      file: bookmarks,
      algorithm: formData.encryptionAlgorithm.value,
      key: formData.key.value,
    };
    try {
      props.daemon.encrypt(extractedFormData).then((response) => {
        setFile(response);
      });
      setFileReceived(true);
    } catch (err) {
      setMessage(err);
    }
  }

    async function fileDownloader() {
    if (file != "") {
      props.daemon.downloader(file, "links");
    }
  }

  useEffect(() => {
    if (formData != "") {
      dataUploader();
    }
  }, [formData]);
  return fileReceived === false ? (
    <>
      <div className="textCenter">
        <h1>{message}</h1>
        <FileForm formData={(formData) => setFormData(formData)} />
        <button className="widebutton" onClick={() => navigate("/")}>
          bookmarks
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="textCenter">
        <h1>file encrypted successfully</h1>
        <p>"{file.slice(0, 64)}..."</p>
        <button className="widebutton" onClick={() => fileDownloader()}>
          download encrypted file
        </button>
        <button className="widebutton" onClick={() => navigate("/")}>
          bookmarks
        </button>
      </div>
    </>
  );
}
