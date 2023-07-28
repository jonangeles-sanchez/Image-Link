import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";

function Register() {
  let state = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };

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

    if (password !== password2) {
      alert("Passwords do not match");
      return;
    } else {
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
      <div className="register-container">
        <section className="heading">
          <h1 className="register-header">Register</h1>
          <p>Register to start sharing Images.</p>
        </section>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Enter your name"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                id="password2"
                name="password2"
                value={password2}
                placeholder="Confirm password"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Signup
              </button>
            </div>
          </form>
        </section>
      </div>

      <footer className="home-footer">
        &copy; 2023 ImageLink. All rights reserved.
        <a
          href="https://www.yourwebsite.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jonhatan
        </a>
      </footer>
    </>
  );
}

export default Register;
