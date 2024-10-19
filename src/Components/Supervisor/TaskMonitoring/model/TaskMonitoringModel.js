import axios from "axios";

export const internTrainingPlan = async (internId) => {
  try {
    const url =
      process.env.REACT_APP_API_BASE_URL +
      `/training/plans/student/${internId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 404) {
      return { notFound: true };
    }
    throw error;
  }
};
