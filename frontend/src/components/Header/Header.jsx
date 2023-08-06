import React from "react";
import "./Header.css";

function Header() {
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      window.location.href = "/";
    }
  };

  return (
    <div className="headerContainer">
      <h3>
        <span className="titleHeader">Inventory Management</span>
      </h3>
      <button className="btnLogout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Header;
