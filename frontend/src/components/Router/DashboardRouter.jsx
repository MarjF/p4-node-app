import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import ProductStatus from "../Product/ProductStatus/ProductStatus";
import ProductList from "../Product/ProductList/ProductList";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://marj-backend-2-95ad54c21769.herokuapp.com/getProducts",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ProductStatus products={products} />
      )}
      <ProductList />
    </>
  );
}

export default Dashboard;
