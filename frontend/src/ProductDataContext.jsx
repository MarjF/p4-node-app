import React, { useState, createContext } from "react";

export const ProductDataContext = createContext();

export const ProductDataProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);

  const addProduct = (newProductData) => {
    setProductData((prevProductData) => {
      const updatedProductData = [...prevProductData, newProductData];
      localStorage.setItem("productData", JSON.stringify(updatedProductData));
      return updatedProductData;
    });
  };

  return (
    <ProductDataContext.Provider value={{ productData, addProduct }}>
      {children}
    </ProductDataContext.Provider>
  );
};
