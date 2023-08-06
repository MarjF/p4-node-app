import React, { useState } from "react";
import logo from "../../assets/logo.jpg";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setLoginError("All fields are required");
      return;
    }

    try {
      const response = await fetch(
        "https://marj-backend-2-95ad54c21769.herokuapp.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log("Logged in successfully");

          localStorage.setItem("token", data.token);

          setLoginError("");
          setEmail("");
          setPassword("");
          setIsLoggedIn(true);
          window.location.href = "/home";
        } else {
          setLoginError("Incorrect email or password. Please try again.");
          setEmail("");
          setPassword("");
        }
      } else {
        const data = await response.json();
        setLoginError(data.message || "Error logging in. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginError("Error logging in. Please try again.");
    }
  };

  return (
    <div className="formContainer">
      <img className="logo" src={logo} alt="Logo" />
      <br />
      Sign in to your account
      {loginError && <p className="errorMessage">{loginError}</p>}
      <form className="loginForm" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          id="password"
          name="password"
        />
        <div className="showPasswordContainer">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            id="showPassword"
            name="showPassword"
          />
          Show Password
        </div>
        <br />
        <button type="submit">Log In</button>
      </form>
      <button
        className="linkBtn"
        onClick={() => (window.location.href = "/register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
};

export default Login;
