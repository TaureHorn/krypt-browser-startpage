export default function FileForm(props) {
  function dataPusher(e) {
    e.preventDefault();
    props.formData(e.target);
  }

  return (
    <form className="form" onSubmit={(e) => dataPusher(e)}>
      <div className="formInputs">
        <div id="fileInput">
          <label>file:</label>
          <input
            autoFocus
            disabled={props.disabled}
            name="bookmarksFile"
            required
            type="file"
          />
        </div>
        <div id="algorithmDropdown">
          <label>algorithm:</label>
          <select disabled={props.disabled} name="encryptionAlgorithm" required>
            <option value="aes">AES</option>
            <option value="rabbit">Rabbit</option>
            <option value="rc4drop">RC4Drop</option>
          </select>
        </div>
        <div id="keyInput">
          <label>key:</label>
          <input
            disabled={props.disabled}
            name="key"
            placeholder="********"
            required
            type="password"
          />
        </div>
      </div>
      <button className="wideButton" type="submit">
        submit
      </button>
    </form>
  );
}
