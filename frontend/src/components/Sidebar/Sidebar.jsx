import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  NavLink,
} from "react-router-dom";
import "./Sidebar.css";
import SidebarItem from "./SidebarItem";
import logo from "../../assets/logo.jpg";
import dashboardIcon from "../../assets/dashboard.svg";
import viewIcon from "../../assets/view.svg";
import editIcon from "../../assets/edit.svg";
import DashboardRouter from "../Router/DashboardRouter";
import AddProductRouter from "../Router/AddProductRouter";
import ProductRouter from "../Router/ProductRouter";

const Sidebar = () => {
  const menu = [
    { title: "Dashboard", icon: dashboardIcon, path: "/home" },
    { title: "Add Product", icon: editIcon, path: "/addProduct" },
    { title: "View Product", icon: viewIcon, path: "/products" },
  ];

  return (
    <Router>
      <div className="layout">
        <div className="sidebar">
          <div className="top_section">
            <div className="logo">
              <img className="logo" src={logo} alt="Logo" />
            </div>
          </div>
          {menu.map((item, index) =>
            item.childrens ? (
              <SidebarItem key={index} item={item}>
                {item.childrens.map((childItem, childIndex) => (
                  <NavLink
                    key={childIndex}
                    to={childItem.path}
                    activeClassName="active"
                  >
                    <SidebarItem item={childItem} />
                  </NavLink>
                ))}
              </SidebarItem>
            ) : (
              <Link key={index} to={item.path || "#"}>
                <SidebarItem item={item} />
              </Link>
            )
          )}
        </div>

        <main>
          <Route exact path="/home" component={DashboardRouter} />
          <Route exact path="/addProduct" component={AddProductRouter} />
          <Route exact path="/products" component={ProductRouter} />
        </main>
      </div>
    </Router>
  );
};

export default Sidebar;
