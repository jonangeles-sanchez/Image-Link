import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
//import { login, reset } from "../features/auth/authSlice";
import Spinner from "../../components/assets/26pFklJn2H.gif";
import { login, register, reset } from "../../features/auth/authSlice";

function Login() {
  const mode = new URLSearchParams(window.location.search).get("mode");

  let state;
  if (mode === "signup") {
    state = {
      name: "",
      email: "",
      password: "",
      password2: "",
    };
  } else {
    state = {
      email: "",
      password: "",
    };
  }

  const [formData, setFormData] = useState(state);
  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      //toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //   if (isLoading) return <Spinner />;

  const onSubmit = (e) => {
    e.preventDefault();

    if (mode === "login") {
      const userData = {
        email,
        password,
      };
      dispatch(login(userData));
    } else {
      if (password !== password2) {
        alert("Passwords do not match");
        return;
      }
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  return (
    <>
      <section className="heading">
        <h1>Login</h1>
        <p>Login and start setting goals.</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          {mode === "signup" && (
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                placeholder="Enter your name"
                onChange={onChange}
              />
            </div>
          )}
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          {mode === "signup" && (
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password2"
                name="password2"
                value={password2}
                placeholder="Confirm password"
                onChange={onChange}
              />
            </div>
          )}
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              {mode === "signup" ? "Sign up" : "Login"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
