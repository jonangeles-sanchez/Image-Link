import { NavLink } from "react-router-dom";
import CodeInput from "./CodeInput";
import cam from "./cam.png";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/">
              <b className={classes.name}>ImageLink</b>
            </NavLink>
          </li>
          <li>
            <button>
              <NavLink
                to="/imagelink"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                <b>New ImageLink</b>
              </NavLink>
            </button>
          </li>
          <li>
            <CodeInput />
          </li>
          <li>
            <button className={classes.login}>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <b>Login</b>
              </NavLink>
            </button>
          </li>
          <li>
            <button>
              <NavLink
                to="/auth?mode=signup"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <b>Sign-up</b>
              </NavLink>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
