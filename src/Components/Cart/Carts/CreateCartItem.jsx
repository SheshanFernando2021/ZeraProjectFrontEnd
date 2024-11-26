import axios from "axios";

const API_URL2 = "https://zera.azurewebsites.net/api/cartitem";

export const CreateCartItem = async (CartId, ProductId, Quantity, Price) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("User is not authenticated.");
      return;
    }

    const response = await axios.post(
      `${API_URL2}/create`,
      {
        CartId: CartId,
        ProductId: ProductId,
        Quantity: Quantity,
        Price: Price,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Item added to cart successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating cart item:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
