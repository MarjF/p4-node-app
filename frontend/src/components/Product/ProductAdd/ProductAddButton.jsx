import React from "react";
import { Link } from "react-router-dom";
import addIcon from "../../../assets/plusIcon.png";
import "./ProductAdd.css";

function ProductAdd() {
  return (
    <div className="addProductContainer">
      <Link to="/addProduct" className="btnAddProduct">
        <img src={addIcon} alt="Edit" className="iconAddProduct" />
        <span className="labelAddProducts">Add Products</span>
      </Link>
    </div>
  );
}

export default ProductAdd;
