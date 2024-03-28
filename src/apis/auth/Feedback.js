import axios from "axios";

export const sendFeedback = async (
  BASE_URL,
  authorizationToken,
  feedbackType,
  feedbackMessage
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/feedback/submit-feedback`,
      { feedbackType, feedbackMessage },
      { headers: { Authorization: authorizationToken } }
    );
    // console.log("feedback response: ", response.data);
    return response.data;
  } catch (error) {
    if (error) {
      // console.log("error find: ", error);
        return error.response.data;
    }
  }
};
