import axios from "axios";
import CryptoJS from "crypto-js";

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

export const encryptId = (id) => {
  return CryptoJS.AES.encrypt(
    id.toString(),
    process.env.REACT_APP_TRAINING_PLAN_ID_ENCRYPTION_KEY
  ).toString();
};

export const decryptId = (encryptedId) => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      encryptedId,
      process.env.REACT_APP_TRAINING_PLAN_ID_ENCRYPTION_KEY
    );
    const decryptedId = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedId;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
