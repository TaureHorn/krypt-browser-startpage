import { useEffect, useState } from "react";

import { fileDataExtractor } from "../functions/fileDataHandler";
import { isObjectEmpty } from "../functions/isObjectEmpty";

import FileForm from "./fileForm";

export default function Uploader(props) {
  const [message, setMessage] = useState("decrypt bookmark file");
  const [formData, setFormData] = useState("");
  const [formDisabled, setFormDisabled] = useState(false);

  async function dataUploader(formData) {
    setFormDisabled(true);
    const file = formData[0].files[0];
    const bookmarks = await fileDataExtractor(file);
    if (!bookmarks || file.type !== "") {
      formReset("incorrect file type");
      return;
    }
    const algorithm = formData.encryptionAlgorithm.value;
    try {
      props.daemon
        .decrypt(algorithm, bookmarks, formData.key.value)
        .then((response) => {
          if (isObjectEmpty(response) === false && !response.config) {
            props.bookmarks(response);
          } else {
            formReset("");
          }
          if (typeof response === "string") {
            setMessage(response);
          } else if (isObjectEmpty(response.data)) {
            setMessage("incorrect key / invalid file");
          }
        });
    } catch (err) {
      formReset(err);
    }
  }
  function formReset(message) {
    setFormDisabled(false);
    setFormData("");
    setMessage(message);
  }

  useEffect(() => {
    if (formData) {
      dataUploader(formData);
    }
  }, [formData]);
  return (
    <div className="textCenter">
      <h1>{message}</h1>
      <FileForm
        disabled={formDisabled}
        formData={(formData) => setFormData(formData)}
      />
    </div>
  );
}
