import { useEffect, useState } from "react";

import { fileDataExtractor } from "../functions/fileDataHandler";

import FileForm from "./fileForm";

export default function Uploader(props) {
  const [message, setMessage] = useState("decrypt bookmark file");
  const [formData, setFormData] = useState("");

  async function dataUploader() {
    const bookmarks = await fileDataExtractor(formData[0].files[0]);
    const extractedFormData = {
      file: bookmarks,
      algorithm: formData.encryptionAlgorithm.value,
      key: formData.key.value,
    };
    try {
      props.daemon.decrypt(extractedFormData);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      setMessage(err);
    }
  }

  useEffect(() => {
    if (formData != "") {
      dataUploader();
    }
  }, [formData]);

  return (
    <>
      <div className="textCenter">
        <h1>{message}</h1>
        <FileForm formData={(formData) => setFormData(formData)} />
      </div>
    </>
  );
}
