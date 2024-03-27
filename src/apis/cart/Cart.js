import axios from "axios";

export const addToCart = async (BASE_URL, authorizationToken, productId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/cart/addtocart`,
      { productId },
      { headers: { Authorization: authorizationToken } }
    );
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

export const cartProducts = async (BASE_URL, authorizationToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/cart/cart-items`, {
      headers: { Authorization: authorizationToken },
    });
    return response.data;
  } catch (error) {
    if (error) {
      console.log("error: ", error);
      return error.response;
    }
  }
};

export const directInCart = async (BASE_URL, authorizationToken, productId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/cart/direct-in-cart/${productId}`,
      {
        headers: { Authorization: authorizationToken },
      }
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    if (error) {
      console.log("error: ", error);
      return error.response;
    }
  }
};

export const updateCartQuantity = async (
  BASE_URL,
  authorizationToken,
  quantity,
  productId
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/cart/updatecartitemquantity`,
      { quantity, productId },
      {
        headers: { Authorization: authorizationToken },
      }
    );
  } catch (error) {
    if (error) {
      console.log("error: ", error);
      return error.response;
    }
  }
};

export const orderplaced = async (
  BASE_URL,
  authorizationToken,
  name,
  address,
  paymentMethod,
  orderFromCart,
  productId
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/product/place-order`,
      { name, address, paymentMethod, orderFromCart, productId },
      {
        headers: { Authorization: authorizationToken },
      }
    );
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    if (error) {
      console.log("error: ", error);
      return error.response;
    }
  }
};
