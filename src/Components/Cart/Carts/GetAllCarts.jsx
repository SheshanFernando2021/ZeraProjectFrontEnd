import React from "react";
import axios from "axios";
const API_URL = "https://zera.azurewebsites.net/api/cart";
const API_URL2 = "https://zera.azurewebsites.net/api/cartitem";
export const GetAllCarts = () => {
  return <div>GetAllCarts</div>;
};

//NOTE: getting the user by the id.
export const GetCartByUserId = async (Id) => {
  try {
    const response = await axios.get($`{API_URL}/userId?id={userId}`);
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching carts:", error);
    throw error;
  }
};

//NOTE: Create cart Items, Adding cart items to the cart.
export const CreateCartItem = async (CartId, ProductId, Quantity, Price) => {
  try {
    const response = await axios.post($`{API_URL2}/create`, {
      CartId: CartId,
      ProductId: ProductId,
      Quantity: Quantity,
      Price: Price,
      withCredentials: true,
    });
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error creating cart item:", error);
    throw error;
  }
};

//NOTE: remove item from cart.

export const RemoveItem = async (cartitemid) => {
  try {
    const response = await axios.delete($`{API_URL2}/{cartItemId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing item: ", error);
    throw error;
  }
};

//NOTE: update quantity of the item in cart.

export const UpdatecartItem = async (cartitemid, quantity) => {
  try {
    const response = await axios.put($`{API_URL2}/{cartitemid}`, {
      Quantity: quantity,
    });
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error updating quantity", error);
  }
};
