import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./ProductList.css";

import { IoIosCloseCircle } from "react-icons/io";

const ViewSpecificProduct = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const closeIcon = <IoIosCloseCircle size={40} color="#f2f2f2" />;
  const history = useHistory();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://marj-backend-2-95ad54c21769.herokuapp.com/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const specificProduct = await response.json();
        setProduct(specificProduct);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  const handleClose = () => {
    history.push("/products");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return (
      <div className="specific-product">
        Product not found or an error occurred.
      </div>
    );
  }

  const {
    name,
    brandname,
    description,
    quantity,
    units,
    image,
    date_created,
    date_updated,
  } = product;

  const createdDate = new Date(date_created).toLocaleDateString();
  const updatedDate = new Date(date_updated).toLocaleDateString();

  return (
    <div className="specificProductContainer">
      <span className="detailTitle">Product Detail</span>

      <div>
        <img src={image} alt={name} className="imgProduct" />
      </div>
      <div className="productDetails">
        <span className="detailT titleName">Product Name:</span>
        <h1 className="detailName">{name}</h1>
        <span className="detailT titleBrandname">Brand Name:</span>
        <p className="detail detailBrandname">{brandname}</p>
        <span className="detailT titleBrandname">Description:</span>
        <p className="detail detailDescription">{description}</p>
        <span className="detailT titleQuantity">Quantity:</span>
        <p className="detail detailQuantity">{quantity}</p>
        <span className="detailT titleUnit">Unit:</span>
        <p className="detail detailUnit">{units}</p>
        <span className="detailT titleCreatedDate">Created Date:</span>
        <p className="detail detailCreatedDate">{createdDate}</p>
        <span className="detailT titleUpdatedDate">Last Updated:</span>
        <p className="detail detailUpdatedDate">{updatedDate}</p>
      </div>
      <button className="closeButton" onClick={handleClose}>
        {closeIcon}
      </button>
    </div>
  );
};

export default ViewSpecificProduct;
