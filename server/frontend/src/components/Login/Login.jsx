import React, { useState } from "react";
import "./Login.css";
import Header from '../Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ onClose }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async (e) => {
    e.preventDefault();
    const login_url = window.location.origin + "/djangoapp/login";

    const res = await fetch(login_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
      }),
    });

    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem("username", json.userName);
      setOpen(false);
    } else {
      alert(json.error || "Login failed");
    }
  };

  if (!open) {
    window.location.href = "/";
  }

  return (
    <div>
      <Header />
      <div onClick={onClose} className="login-container">
        <div onClick={(e) => e.stopPropagation()} className="card">
          <form className="login_panel" onSubmit={login}>
            <h2 className="card-title">Login</h2>
            <div className="input">
              <FontAwesomeIcon icon={faUser} className="input_icon" />
              <input
                type="text"
                name="userName"
                placeholder="Username or Email"
                className="input_field"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="input password_input">
              <FontAwesomeIcon icon={faLock} className="input_icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input_field"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="toggle_password_icon"
                onClick={togglePasswordVisibility}
              />
            </div>
            <div className="action_buttons">
              <input className="action_button" type="submit" value="Login" />
              <input className="action_button" type="button" value="Cancel" onClick={() => setOpen(false)} />
            </div>
            <a className="registerlink" href="/register">Don't have an account? Register</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
