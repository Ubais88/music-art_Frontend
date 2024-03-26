import axios from "axios";

export const addToCart = async (BASE_URL, authorizationToken, productId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/cart/addtocart`,
      { productId },
      { headers: { Authorization: authorizationToken } }
    );
    console.log("response:", response);
    return response;
  } catch (error) {
    if (error) {
      console.log("error: ", error);
      return error.response;
    }
  }
};

export const cartLength = async (BASE_URL, authorizationToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/cart/cart-length`, {
      headers: { Authorization: authorizationToken },
    });
    return response;
  } catch (error) {
    if (error) {
      console.log("error: ", error);
      return error.response;
    }
  }
};
