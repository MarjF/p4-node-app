import React from "react";
import "./ProductStatus.css";
import { AiFillExclamationCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../StatusInfo/StatusInfo";

const earningIcon = <AiFillExclamationCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

const ProductSummary = ({ products }) => {
  const totalProducts = products.length;
  const outOfStockCount = products.filter(
    (product) => product.quantity === 0
  ).length;
  const totalItems = products.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const alertedProducts = products.filter(
    (product) => product.quantity <= 5 && product.quantity > 1
  ).length;

  return (
    <div className="productSummary">
      <div className="titleStat">Inventory Status</div>

      <InfoBox
        icon={productIcon}
        title={"Total Products"}
        count={totalProducts}
        bgColor="card1"
      />
      <InfoBox
        icon={categoryIcon}
        title={"Total Items"}
        count={totalItems}
        bgColor="card2"
      />
      <InfoBox
        icon={outOfStockIcon}
        title={"Out of Stock"}
        count={outOfStockCount}
        bgColor="card3"
      />
      <InfoBox
        icon={earningIcon}
        title={"Alerted Products"}
        count={alertedProducts}
        bgColor="card4"
      />
    </div>
  );
};

export default ProductSummary;
