import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import ProductStatus from "../Product/ProductStatus/ProductStatus";
import ProductList from "../Product/ProductList/ProductList";
import ProductAddButton from "../Product/ProductAdd/ProductAddButton";
import ProductForm from "../Product/ProductAdd/ProductAddForm";
import ViewSpecificProduct from "../Product/ProductList/ViewSpecificProduct";
function ProductRouter() {
  return (
    <>
      {/* <Sidebar> */}
      <Header />
      {/* <ProductStatus /> */}
      {/* <ProductAddButton /> */}
      <ViewSpecificProduct />
      {/* <ProductForm /> */}
      {/* </Sidebar> */}
    </>
  );
}

export default ProductRouter;
