import { useState } from "react";

export default function Authenticator(props) {
  const daemon = props.daemon;
    const [message, setMessage] = useState("Authentication required!")
  const [disabled, setDisabled] = useState(false);
  const [errMSG, setErrMSG] = useState("");

  function authChecker(e) {
    e.preventDefault();
    // setDisabled(true);
    const input = e.target.authCode.value.toString();
    try {
      daemon.authenticate(input);
    } catch (err) {
      setErrMSG(err);
      document.getElementById("errDialog").showModal();
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
      <div style={{ alignContent: "center", justifyContent: "center", textAlign: "center" }}>
        <h1>{message}</h1>
        <form onSubmit={(e) => authChecker(e)}>
          <input
            autoFocus
            disabled={disabled}
            name="authCode"
            placeholder="********"
            required
            type="password"
          />
          <button style={{ display: "none" }} type="submit">
            o
          </button>
        </form>
      </div>
    </>
  );
}
