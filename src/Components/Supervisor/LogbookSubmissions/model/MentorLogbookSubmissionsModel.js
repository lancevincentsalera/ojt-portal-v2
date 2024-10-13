import axios from "axios";

export const getMentorLogbookSubmissions = async (mentorId) => {
  try {
    const url =
      process.env.REACT_APP_API_BASE_URL + `/logbooks/mentor/${mentorId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getInternInfo = async (studentId) => {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + `/students/${studentId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
