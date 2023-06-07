import { NavLink } from "react-router-dom";
import CodeInput from "./CodeInput";
import cam from "./cam.png";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <img src={cam} alt="logo" height={95} width={110} />
        <ul className={classes.list}>
          <li>
            <b className={classes.name}>ImageLink</b>
          </li>
          <li>
            <button>
              <NavLink
                to="/"
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
                to="/auth?mode=login"
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
