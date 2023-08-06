import React, { useState, useEffect } from "react";
import "./ProductAdd.css";
import backIcon from "../../../assets/backIcon.png";

const ProductForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [productName, setProductName] = useState("");
  const [productBrandName, setProductBrandName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productUnit, setProductUnit] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleFormSubmit = async () => {
    if (
      !productName ||
      !productBrandName ||
      !productQuantity ||
      !productUnit ||
      !productDescription ||
      !imagePreview
    ) {
      alert("All fields are required.");
      return;
    }

    const newProductData = {
      name: productName,
      brandname: productBrandName,
      quantity: productQuantity,
      units: productUnit,
      description: productDescription,
      image: imagePreview,
    };

    setIsLoading(true);

    try {
      // Make a POST request to the backend API to add the product
      const response = await fetch(
        "https://marj-backend-2-95ad54c21769.herokuapp.com/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProductData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add the product");
      }

      // Clear the form fields
      setImagePreview(null);
      setProductName("");
      setProductBrandName("");
      setProductQuantity("");
      setProductUnit("");
      setProductDescription("");

      // Alert and console log the success message
      const responseData = await response.json();
      alert(responseData.message);
      console.log("New Product Data:", responseData);

      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add the product. Please try again.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedProductData = localStorage.getItem("productData");
    if (storedProductData) {
      setProductData(JSON.parse(storedProductData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("productData", JSON.stringify(productData));
  }, [productData]);

  const handleGoBack = () => {
    const confirmGoBack = window.confirm("Are you sure you want to go back?");
    if (confirmGoBack) {
      window.location.href = "/home";
    }
  };

  return (
    <div className="productFormContainer">
      <div className="addFormInsideContainer">
        <div className="titleAddContainer">
          <div className="addTitle">Add Products</div>
          <button className="btnBack" onClick={handleGoBack}>
            <img src={backIcon} alt="Back" className="iconAddProduct" />
            <span className="labelAddProduct">Go Back</span>
          </button>
        </div>
        <div className="group">
          <span>Product Image</span>
          {imagePreview ? (
            <div className="imgPreview">
              <img src={imagePreview} alt="Uploaded Product" />
            </div>
          ) : (
            <div className="imgPlaceholder">
              <img
                src="https://via.placeholder.com/200"
                alt="Product Placeholder"
              />
            </div>
          )}
          <input type="file" name="image" onChange={handleImageChange} />
        </div>
        <div className="productNameBox">
          <span>Product Name:</span>
          <input
            type="text"
            className="inputProduct productName"
            placeholder="Product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="brandNameBox">
          <span>Brand Name:</span>
          <input
            type="text"
            className="inputProduct brandName"
            placeholder="Brand Name"
            value={productBrandName}
            onChange={(e) => setProductBrandName(e.target.value)}
          />
        </div>
        <div className="quantityBox">
          <span>Product Quantity:</span>
          <input
            type="text"
            className="inputProduct productQuantity"
            placeholder="Product Quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
        </div>
        <div className="unitBox">
          <span>Unit(pc/box):</span>
          <input
            type="text"
            className="inputProduct productUnit"
            placeholder="Product Unit"
            value={productUnit}
            onChange={(e) => setProductUnit(e.target.value)}
          />
        </div>
        <div className="descriptionBox">
          <span>Product Description:</span>
          <textarea
            placeholder="Product Description"
            className="textDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div className="submitBox">
          <button
            type="submit"
            className="submitBtn"
            onClick={handleFormSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Save Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
