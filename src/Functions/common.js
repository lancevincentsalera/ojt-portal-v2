import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const reuseCommonFunctionality = async (
  apiUrl,
  setResponse,
  setError,
  err
) => {
  try {
    const url = `${apiBaseUrl}/${apiUrl}`;
    const response = await axios.get(url);

    if (response.status === 200 || response.status === 201) {
      setResponse(response.data);
    } else {
      setError(err || "An error occurred while fetching the data.");
    }
  } catch (error) {
    setError(err || "Error fetching data.");
    console.error(error);
  }
};
