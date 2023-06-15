import { useState } from "react";

export default function FileForm(props) {
  const [disabled, setDisabled] = useState(false);

  function dataPusher(e) {
    e.preventDefault();
    setDisabled(true);
    props.formData(e.target);
  }

  return (
    <form className="form" onSubmit={(e) => dataPusher(e)}>
      <div className="formInputs">
        <div id="fileInput">
          <label>file:</label>
          <input
            disabled={disabled}
            name="bookmarksFile"
            required
            type="file"
          />
        </div>
        <div id="algorithmDropdown">
          <label>algorithm:</label>
          <select disabled={disabled} name="encryptionAlgorithm" required>
            <option value="aes">AES</option>
            <option value="sha256">SHA256</option>
            <option value="sha512">SHA512 </option>
            <option className="option" value="rc4drop">
              RC4Drop
            </option>
          </select>
        </div>
        <div id="keyInput">
          <label>key:</label>
          <input
            disabled={disabled}
            name="key"
            placeholder="********"
            type="password"
          />
        </div>
      </div>
      <button className="widebutton" type="submit">
        submit
      </button>
    </form>
  );
}
