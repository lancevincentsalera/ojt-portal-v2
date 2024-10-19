import axios from "axios";
import { useAuth } from "../../Common/AuthContext";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const fetchStudentsByInstructor = async (
  setStudents,
  setIsSubmitting,
  setIsSuccess,
  setErrorMessage,
  setIsError,
  instructorId
) => {
  setIsSubmitting(true);
  try {
    const response = await axios.get(
      `${apiBaseUrl}/teachers/${instructorId}/students`
    );
    setStudents(response.data.students);
    setIsSubmitting(false);
    setIsSuccess(true);
  } catch (error) {
    const errorDetail =
      error.response?.data?.message || "Error fetching students.";
    setErrorMessage(errorDetail);
    setIsError(true);
    setIsSubmitting(false);
  }
};

export const fetchAllStudentsFilterDepartment = async (
  setAllStudents,
  setErrorMessage,
  setIsError,
  departmentCode
) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/students`, {
      params: { departmentCode: departmentCode },
    });
    setAllStudents(response.data);
  } catch (error) {
    setErrorMessage("Error fetching department students.");
    setIsError(true);
  }
};
