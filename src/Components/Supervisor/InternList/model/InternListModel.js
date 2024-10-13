import axios from "axios";
export const GetInternList = async (mentorId) => {
  try {
    const url =
      process.env.REACT_APP_API_BASE_URL + `/mentors/${mentorId}/students`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
