import axios from "axios";

export const register = async (formData, BASE_URL) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/signup`,
      JSON.stringify(formData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    if (error) {
      return error.response.data;
    }
  }
};

export const login = async (formData, BASE_URL) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      JSON.stringify(formData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    if (error) {
      return error.response.data;
    }
  }
};

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
      console.log("error: ", error);
      return error.response.data;
    }
  }
};
