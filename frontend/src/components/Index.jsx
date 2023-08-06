import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./User/Login";
import Register from "../components/User/Register";
import HomePage from "./HomePage/HomePage";
import "../App.css";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(isLoggedIn);
    };

    checkLoggedInStatus();
  }, []);

  return (
    <div className="App">
      <Router>
        <Route
          exact
          path="/"
          render={(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={HomePage} />
      </Router>
    </div>
  );
};

export default Index;
