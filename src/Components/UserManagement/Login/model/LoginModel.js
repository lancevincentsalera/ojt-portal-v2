import axios from "axios";

const LoginModel = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
        email,
        password,
      });
      return response.data; 
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  },
};

export default LoginModel;
