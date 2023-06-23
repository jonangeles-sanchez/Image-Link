import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";
import SearchGlass from "./searchGlass.png";

function CodeInput() {
  return (
    <div className="CodeInputContainer">
      <form method={"post"} className="CodeInputForm">
        <b className="gotcode">Got a code? </b>
        <input
          id="code"
          type="text"
          name="code"
          required
          placeholder="Enter the code here!"
          className="CodeInput"
        />
        <button type="submit" className="CodeInputButton">
          <img
            src={SearchGlass}
            alt="searching-magnifying-glass"
            className="CodeInputButtonImage"
            height={35}
            width={35}
          />
        </button>
      </form>
    </div>
  );
}

export default CodeInput;
