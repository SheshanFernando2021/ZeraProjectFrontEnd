import React from "react";
import axios from "axios";

const API_URL = "http://localhost:5167/api/product/all";

const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default getAllProducts;
