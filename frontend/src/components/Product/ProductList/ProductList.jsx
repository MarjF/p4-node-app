import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import ViewSpecificProduct from "../ProductList/ViewSpecificProduct";
import EditProduct from "../ProductAdd/ProductEdit";

const ProductList = () => {
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
            "Content-Type": "application/json",
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

  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://marj-backend-2-95ad54c21769.herokuapp.com/${productId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete the product");
        }
        // Remove the deleted product from the state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    }
  };

  return (
    <Router>
      <div className="productList">
        <div>
          <span className="inventoryTitle">Inventory Items</span>
          <hr />

          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Brand Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products && products.length > 0 ? (
                products.map((product, index) => {
                  const {
                    _id,
                    name,
                    brandname,
                    description,
                    quantity,
                    units,
                    image,
                  } = product;
                  return (
                    <tr key={_id}>
                      <td>
                        <img src={image} alt={name} className="product-image" />
                      </td>
                      <td>{name}</td>
                      <td>{brandname}</td>
                      <td>{description}</td>
                      <td>{quantity}</td>
                      <td>{units}</td>
                      <td className="icons">
                        <span className="iconAction viewProduct">
                          <Link to={`/products/${_id}/view`}>
                            <AiOutlineEye size={25} color="purple" />
                          </Link>
                        </span>
                        <span className="iconAction editProduct">
                          <Link to={`/products/${_id}/edit`}>
                            <FaEdit size={20} color="green" />
                          </Link>
                        </span>
                        <span
                          className="iconAction deleteProduct"
                          onClick={() => handleDeleteProduct(_id)}
                        >
                          <FaTrashAlt size={20} color="red" />
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7">
                    {isLoading ? "Loading..." : "No products yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="no-products">No products yet.</div>
          )}
        </div>
      </div>

      {products.length > 0 && (
        <>
          <Route path="/products/:id/view">
            <div className="popUpContainer">
              <div className="popUpInner">
                <ViewSpecificProduct products={products} />
              </div>
            </div>
          </Route>
          <Route path="/products/:id/edit">
            <div className="popUpContainer">
              <div className="popUpInner">
                <EditProduct />
              </div>
            </div>
          </Route>
        </>
      )}
    </Router>
  );
};

export default ProductList;
