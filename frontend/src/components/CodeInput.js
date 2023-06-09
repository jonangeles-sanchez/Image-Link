import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
  useFetcher,
} from "react-router-dom";
import classes from "./CodeInput.module.css";
import SearchGlass from "./searchGlass.png";

function CodeInput() {
  const fetcher = useFetcher();
  return (
    <div className={classes.CodeInputContainer}>
      <fetcher.Form method={"post"} className={classes.CodeInputForm}>
        <b>Got a code? </b>
        <input
          id="code"
          type="text"
          name="code"
          required
          placeholder="Enter the code here!"
          className={classes.CodeInput}
        />
        <button type="submit" className={classes.CodeInputButton}>
          <img
            src={SearchGlass}
            alt="searching-magnifying-glass"
            className={classes.CodeInputButtonImage}
            height={35}
            width={35}
          />
        </button>
      </fetcher.Form>
    </div>
  );
}

export default CodeInput;
