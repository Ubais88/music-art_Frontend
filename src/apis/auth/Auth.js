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
