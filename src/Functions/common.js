import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log("apiBaseUrl", apiBaseUrl);

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const handleGetDegreePrograms = async (setVar, setError) => {
  try {
    const url = `${apiBaseUrl}/degree-programs`;
    const response = await axios.get(url);

    if (response.status === 200) {
      setVar(response.data);
    } else {
      setError("An error occurred while fetching the degree programs.");
    }
  } catch (error) {
    setError("Error fetching degree programs.");
    console.error("Error fetching degree programs:", error);
  }
};
