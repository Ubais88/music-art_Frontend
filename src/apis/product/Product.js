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
    // console.log(response)
    if (response.status === 200) {
      return response.data;
    } else {
      const message = response.data.message;
      console.log("Error fetching products:", message);
      return { success: false, message };
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, message: "Something went wrong" };
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
    return response.data;
  } catch (error) {
    console.error("Error fetching all invoices:", error);
    return error.response ? error.response.data : { success: false, message: "Something went wrong" };
  }
};

export const fetchOneInvoice = async (BASE_URL, authorizationToken, orderId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/product/get-order/${orderId}`,
      {
        headers: { Authorization: authorizationToken },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching one invoice:", error);
    return error.response ? error.response.data : { success: false, message: "Something went wrong" };
  }
};

