import { NavLink } from "react-router-dom";
import CodeInput from "./CodeInput";
import background from "./assets/card-red-glow.png";

function MainNavigation() {
  return (
    <header className="home-header">
      <nav>
        <div className="left-header">
          <NavLink to="/">
            <b className="name">ImageLink</b>
          </NavLink>
          <button className="new-imagelink">
            <NavLink to="/newimagelink" end>
              <b>New ImageLink</b>
            </NavLink>
          </button>
        </div>
        <CodeInput />
        <div className="right-header">
          <button className="login">
            <NavLink to="/auth?mode=login">
              <b>Login</b>
            </NavLink>
          </button>
          <button className="signup">
            <NavLink to="/auth?mode=signup">
              <b>Sign-up</b>
            </NavLink>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
