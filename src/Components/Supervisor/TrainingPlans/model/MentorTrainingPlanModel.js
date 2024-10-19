import axios from "axios";

export const MentorTrainingPlans = async (mentorId) => {
  try {
    const url =
      process.env.REACT_APP_API_BASE_URL + `/training/plans/mentor/${mentorId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchStudentsByMentor = async (mentorId) => {
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
