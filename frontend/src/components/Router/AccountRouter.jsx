import React from "react";
import Header from "../Header/Header";
import Account from "../User/Account";

function AccountRouter() {
  return (
    <>
      <div className="accountRouterContainer">
        <Header />
        <Account />
      </div>
    </>
  );
}

export default AccountRouter;
