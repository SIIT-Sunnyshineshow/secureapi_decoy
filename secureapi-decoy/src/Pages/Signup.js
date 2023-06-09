import React, { useState } from "react";
import axios from "axios";

import sha256 from "crypto-js/sha256";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const loginfn = () => {
    //validate check whether all the form is completed
    if (!username) {
      console.log("Please fill in the username");
      return;
    }

    if (!password) {
      console.log("Please fill in the password");
      return;
    }
    if (password != confirmPassword) {
      alert("Password and ConfirmPass does not match");
      return;
    }

    //hash password
    let raw_pass = password;
    // Generate a SHA-256 hash of the password
    let hashedPassword = sha256(password).toString();
    //console.log('Hashed password:', hashedPassword);

    //axios post backend send to the backendman aka sunny
    // Make a POST request to the backend with the request body and headers using Axios
    axios
      .post("http://localhost:3001/api/register", {
        username: username,
        credentials: hashedPassword,
      })
      .then((response) => {
        if (response.data.code == 200) {
          //Something to save tokens and redirect

          window.location.replace("/login");
        }
      })
      .catch((error) => {
        console.log("Login failed, please try again");
      });
  };

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
  }

  return (
    // HTML
    <form onSubmit={handleSubmit}>

      <h1>
        {" "}
        <br /> Create Account
      </h1>
      <h5>
        {" "}
        <br />
        please fill in with your information <br />
      </h5>

      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <div>
        <label htmlFor="comfirmpassword">Comfirm Password:</label>
        <input
          type="password"
          id="confirmpassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>

      <br />
      <button onClick={() => loginfn()}>SIGN UP</button>

      <div>
        <h2> Next step login</h2>
        <button onClick={() => (window.location.href = "/Login")}>
          {" "}
          SIGN IN{" "}
        </button>
      </div>


    </form>
  );
}

export default Signup;
