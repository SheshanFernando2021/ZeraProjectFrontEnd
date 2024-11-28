import React, { useEffect, useState } from "react";
import getAllProducts from "../Products/getAllProducts";
import axios from "axios";
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
        console.log("Fetched products:", productsData);

        if (
          productsData &&
          productsData.$values &&
          Array.isArray(productsData.$values)
        ) {
          setProducts(productsData.$values);
        } else {
          throw new Error("Fetched data is not an array");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to log in to add products to your cart.");
      return;
    }

    try {
      console.log("User Token: ", token);

      const response = await axios.post(
        "https://zera.azurewebsites.net/api/CartItem/add",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Product added to cart successfully!");
      } else {
        alert("Failed to add product to cart.");
      }
    } catch (error) {
      console.error(
        "Error adding product to cart:",
        error.response?.data || error
      );

      if (error.response?.status === 401) {
        alert(
          "Unauthorized. Please log in. Token might be invalid or expired."
        );
      } else {
        alert("An error occurred while adding the product to the cart.");
      }
    }
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
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product.productId)}
                  >
                    Add to Cart
                  </button>
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
