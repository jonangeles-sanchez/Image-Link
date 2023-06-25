import { useNavigate } from "react-router-dom";
import SearchGlass from "./searchGlass.png";

function CodeInput() {
  const navigate = useNavigate();

  const handleCodeInput = (e) => {
    e.preventDefault();
    const code = document.getElementById("code").value;
    if (code.length !== 5) {
      alert("Code must be 5 characters long");
      return;
    }
    navigate(`/imagelink/${code}`);

    document.getElementById("code").value = "";
  };

  return (
    <div className="CodeInputContainer">
      <form className="CodeInputForm">
        <b className="gotcode">Got a code? </b>
        <input
          id="code"
          type="text"
          name="code"
          required
          placeholder="Enter the code here!"
          className="CodeInput"
        />
        <button className="CodeInputButton">
          <img
            src={SearchGlass}
            alt="searching-magnifying-glass"
            className="CodeInputButtonImage"
            height={35}
            width={35}
            onClick={handleCodeInput}
          />
        </button>
      </form>
    </div>
  );
}

export default CodeInput;
