import React, { useState } from "react";
import logo from "../../assets/logo.jpg";
import Users from "../User/users";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState("");
  const users = new Users();

  const usersArray = [];

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(password);
    // Check if any of the input fields are empty
    if (!email || !password || !name) {
      setError("Please fill in all fields");
      return;
    }

    // Check if username is already taken
    if (!users.validateUsername(name, usersArray)) {
      setError(
        "Username is already taken. Please provide a different username."
      );
      setEmail("");
      setPassword("");
      setName("");
      return;
    }

    // Check if email is valid
    if (!users.validateEmail(email, usersArray)) {
      setError("Please provide a valid email address");
      return;
    }

    // Check if password meets requirements
    if (!users.validatePassword(password)) {
      setError(
        "Password must be at least 6 characters long and contain both uppercase and lowercase letters"
      );
      return;
    }

    // Register the new account
    const newAccount = { email, password, name };

    try {
      const response = await fetch(
        "https://marj-backend-2-95ad54c21769.herokuapp.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAccount),
        }
      );

      if (response.ok) {
        setRegistrationSuccess(true);
        setError("");
      } else {
        const data = await response.json();
        setError(data.message || "Error registering user");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error registering user");
    }

    setEmail("");
    setPassword("");
    setName("");
  };

  const handleRegisterAnother = () => {
    setRegistrationSuccess(false);
    setError("");
  };

  return (
    <div className="formContainer">
      <img className="logo" src={logo} alt="Logo" />
      <br />
      Sign up for your account
      {registrationSuccess ? (
        <div>
          <p className="successMessage">Account registered successfully!</p>
          <button onClick={handleRegisterAnother}>
            Register Another Account
          </button>
        </div>
      ) : (
        <form className="registerForm" onSubmit={handleRegister}>
          <label htmlFor="name">Username</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Username"
          />
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            id="email"
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            id="password"
          />
          {error && <p className="errorMessage">{error}</p>}
          <button type="submit">Register</button>
        </form>
      )}
      <button className="linkBtn" onClick={() => (window.location.href = "/")}>
        Already have an account? Login here.
      </button>
    </div>
  );
};

export default Register;
