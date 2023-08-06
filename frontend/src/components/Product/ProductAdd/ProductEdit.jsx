import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import backIcon from "../../../assets/backIcon.png";
import "./ProductAdd.css";

const EditProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  const [productName, setProductName] = useState("");
  const [productBrandName, setProductBrandName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productUnit, setProductUnit] = useState("");
  const [productDescription, setProductDescription] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
        setIsLoading(false);

        // Set the initial values based on the retrieved product data
        setProductName(data.name);
        setProductBrandName(data.brandname);
        setProductQuantity(data.quantity);
        setProductUnit(data.units);
        setProductDescription(data.description);
        setImagePreview(data.image);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

    const updatedProductData = {
      name: productName,
      brandname: productBrandName,
      quantity: productQuantity,
      units: productUnit,
      description: productDescription,
      image: imagePreview,
    };

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://marj-backend-2-95ad54c21769.herokuapp.com/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProductData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the product");
      }

      // Clear the data fields
      setImagePreview(null);
      setProductName("");
      setProductBrandName("");
      setProductQuantity("");
      setProductUnit("");
      setProductDescription("");

      const responseData = await response.json();
      alert("Product updated successfully");
      console.log("Updated Product Data:", responseData);

      setIsLoading(false);
      if (responseData) {
        window.location.href = "/home";

        // <Link to="/product"></Link>;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update the product. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    const confirmGoBack = window.confirm("Are you sure you want to go back?");
    if (confirmGoBack) {
      window.location.href = "/home";
    }
  };

  return (
    <div className="editFormContainer">
      <div className="addFormInsideContainer">
        <div className="titleAddContainer">
          <div className="addTitle">Edit Product</div>
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
            {isLoading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
