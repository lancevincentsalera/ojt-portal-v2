import axios from "axios";

export const Users = async (authUser) => {
  const url = process.env.REACT_APP_API_BASE_URL + "/users";
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `${authUser.tokenType} ${authUser.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
