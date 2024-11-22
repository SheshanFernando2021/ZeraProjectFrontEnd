import React from "react";
import axios from "axios";

const API_URL = "https://zera.azurewebsites.net/api/product/all";

const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("API Response:", response.data); // Log the response data
    return response.data; // Return the list of products
  } catch (error) {
    console.error("Error fetching products:", error); // Log any error
    throw error;
  }
};

export default getAllProducts;
