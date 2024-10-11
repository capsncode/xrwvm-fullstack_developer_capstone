import React, { useState } from "react";
import "./Register.css";
import Header from '../Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = ({ onClose }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(true);

  let register_url = window.location.origin + "/djangoapp/register";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const register = async (e) => {
    e.preventDefault();
    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
      }),
    });

    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem("username", json.userName);
      setOpen(false);
    } else if (json.error === "Already Registered") {
      alert("The username is already registered");
      setOpen(false);
    }
  };

  if (!open) {
    window.location.href = "/";
  }

  return (
    <div>
      <Header />
      <div onClick={onClose} className="register-container">
        <div onClick={(e) => e.stopPropagation()} className="card">
          <form className="login_panel" onSubmit={register}>
            <h2 className="card-title">Sign Up</h2>
            <div className="input">
              <FontAwesomeIcon icon={faUser} className="input_icon" />
              <input type="text" name="username" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className="input">
              <FontAwesomeIcon icon={faUser} className="input_icon" />
              <input type="text" name="first_name" placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="input">
              <FontAwesomeIcon icon={faUser} className="input_icon" />
              <input type="text" name="last_name" placeholder="Last Name" className="input_field" onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="input">
              <FontAwesomeIcon icon={faEnvelope} className="input_icon" />
              <input type="email" name="email" placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input password_input">
              <FontAwesomeIcon icon={faLock} className="input_icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="psw"
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
              <input className="action_button" type="submit" value="Register" />
              <input className="action_button" type="button" value="Cancel" onClick={() => setOpen(false)} />
            </div>
            <a className="loginlink" href="/login">Already have an account? Log In</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
