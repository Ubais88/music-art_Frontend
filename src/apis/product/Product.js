import axios from "axios";

export const allProducts = async (
  BASE_URL,
  headphoneType,
  company,
  color,
  price,
  searchTerm,
  sortBy
) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/allproducts`, {
      params: {
        headphoneType,
        company,
        color,
        price,
        searchTerm,
        sortBy,
      },
    });
    return response;
  } catch (error) {
    if (error) {
      // console.log("error: ", error);
      return error.response.data;
    }
  }
};

export const productDetails = async (BASE_URL, productId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/product/details/${productId}`
    );
    return response.data;
  } catch (error) {
    if (error) {
      console.log("error: ", error);
      return error.response.data;
    }
  }
};

export const fetchAllInvoices = async (BASE_URL, authorizationToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/get-orders`, {
      headers: { Authorization: authorizationToken },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (error) {
      // console.log("error: ", error.response);
      return error.response;
    }
  }
};

export const fetchOneInvoice = async (
  BASE_URL,
  authorizationToken,
  orderId
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/product/get-order/${orderId}`,
      {
        headers: { Authorization: authorizationToken },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error) {
      console.log("error: ", error);
      return error.response.data;
    }
  }
};
