import React from "react";
import axios from "axios";

const API_URL = "https://zera.azurewebsites.net/api/cart";
const API_URL2 = "https://zera.azurewebsites.net/api/cartitem";

export const GetAllCarts = () => {
  return <div>GetAllCarts</div>;
};

// Get cart by User ID
export const GetCartByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/userId?id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching carts:", error);
    throw error;
  }
};

export const CreateCartItem = async (CartId, ProductId, Quantity, Price) => {
  try {
    const response = await axios.post(`${API_URL2}/create`, {
      CartId: CartId,
      ProductId: ProductId,
      Quantity: Quantity,
      Price: Price,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating cart item:", error);
    throw error;
  }
};

export const RemoveItem = async (cartItemId) => {
  try {
    const response = await axios.delete(`${API_URL2}/${cartItemId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing item: ", error);
    throw error;
  }
};

export const UpdatecartItem = async (cartItemId, quantity) => {
  try {
    const response = await axios.put(`${API_URL2}/${cartItemId}`, {
      Quantity: quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating quantity", error);
    throw error;
  }
};
