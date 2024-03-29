import axios from "axios";

export const addToCart = async (BASE_URL, authorizationToken, productId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/cart/addtocart`,
      { productId },
      { headers: { Authorization: authorizationToken } }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return error.response
      ? error.response.data
      : { success: false, message: "Something went wrong" };
  }
};

export const cartLength = async (BASE_URL, authorizationToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/cart/cart-length`, {
      headers: { Authorization: authorizationToken },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error fetching cart length:", response.data.message);
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    if (error.response.status === 401) {
      console.log(error.response.status);
      return error.response;
    } else {
      console.error("Error fetching cart length:", error);
      return { success: false, message: "Something went wrong" };
    }
  }
};

export const cartProducts = async (BASE_URL, authorizationToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/cart/cart-items`, {
      headers: { Authorization: authorizationToken },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Error fetching cart products:", error);
    return { success: false, message: "Something went wrong" };
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
    console.log("directincart", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching product from cart:", error);
    return { success: false, message: "Failed to fetch product from cart" };
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
    console.log("Response from placing order:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    return error.response
      ? error.response.data
      : { success: false, message: "Something went wrong" };
  }
};
