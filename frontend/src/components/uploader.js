import { useEffect, useState } from "react";

import { fileDataExtractor } from "../functions/fileDataHandler";
import { isObjectEmpty } from "../functions/isObjectEmpty";

import FileForm from "./fileForm";

export default function Uploader(props) {
  const [message, setMessage] = useState("decrypt bookmark file");
  const [formData, setFormData] = useState("");
  const [formDisabled, setFormDisabled] = useState(false);

  async function dataUploader() {
    setFormDisabled(true);
    const bookmarks = await fileDataExtractor(formData[0].files[0]);
    const extractedFormData = {
      file: bookmarks,
      algorithm: formData.encryptionAlgorithm.value,
      key: formData.key.value,
    };
    try {
      props.daemon.decrypt(extractedFormData).then((response) => {
        if (isObjectEmpty(response) === false) {
          props.bookmarks(response);
        } else {
            setFormDisabled(false)
            setMessage("incorrect key")
        }
      });
    } catch (err) {
      setMessage(err);
    }
  }

  useEffect(() => {
    if (formData !== "") {
      dataUploader();
    }
  }, [formData]);

  return (
    <>
      <div className="textCenter">
        <h1>{message}</h1>
        <FileForm
          disabled={formDisabled}
          formData={(formData) => setFormData(formData)}
        />
      </div>
    </>
  );
}
