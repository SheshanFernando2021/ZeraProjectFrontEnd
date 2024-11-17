// src/components/ProductList.js

import React, { useEffect, useState } from "react";
import getAllProducts from "../Products/getAllProducts";
import "./ProductList.css";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products when the component mounts
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-container">
      <div className="product-list">
        {products.map((product) => (
          <div key={product.productId} className="product-item">
            <h3 className="product-name">{product.name}</h3>
            <img src={product.imageURL} alt="" className="product-img" />
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
