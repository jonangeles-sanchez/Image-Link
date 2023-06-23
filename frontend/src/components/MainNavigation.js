import { NavLink, useNavigate } from "react-router-dom";
import CodeInput from "./CodeInput";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import background from "./assets/card-red-glow.png";

function MainNavigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

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
          {!user ? (
            <>
              <button className="login">
                <NavLink to="/login">
                  <b>Login</b>
                </NavLink>
              </button>
              <button className="signup">
                <NavLink to="/signup">
                  <b>Sign-up</b>
                </NavLink>
              </button>
            </>
          ) : (
            <>
              <button className="signup" onClick={handleLogout}>
                <NavLink to="/signup">
                  <b>Logout</b>
                </NavLink>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
