import React, { useEffect, useState } from "react";
import getAllProducts from "../Products/getAllProducts";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
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

    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

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
          <div
            key={product.productId}
            className="product-item"
            onMouseEnter={() => handleMouseEnter(product.productId)}
            onMouseLeave={handleMouseLeave}
          >
            <h3 className="product-name">{product.productName}</h3>
            <img
              src={product.imageURL}
              alt={product.productName}
              className="product-img"
            />
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>

            {/* Only show buttons for the hovered product */}
            {hoveredProductId === product.productId && (
              <div className="product-buttons">
                {!isLoggedIn ? (
                  <>
                    <button className="login-btn">
                      Login to purchase this item
                    </button>
                    <button className="register-btn">Register</button>
                  </>
                ) : (
                  <button className="add-to-cart-btn">Add to Cart</button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
