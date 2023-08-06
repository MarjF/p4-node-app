import React from "react";
import Header from "../Header/Header";
import ProductList from "../Product/ProductList/ProductList";
import ProductAddButton from "../Product/ProductAdd/ProductAddButton";

function ProductRouter() {
  return (
    <>
      <Header />
      <ProductAddButton />
      <ProductList />
    </>
  );
}

export default ProductRouter;
