import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const getAvailableSubMentors = async (id) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/submentor/headmentor/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
