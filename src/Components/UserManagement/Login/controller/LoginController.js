import React, { useMemo , useState } from "react";
import LoginView from "../view/LoginView";
import LoginModel from "../model/LoginModel"; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../Common/AuthContext";
import axios from "axios";
import { useGlobalState } from "../../../Globals/variables";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const LoginController = ({ view }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();   
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const { setAllowPath } = useGlobalState();
  const { setAuthUser, setIsLoggedIn } = useAuth();


  const handleModalAction = () =>
    setShowForgotPasswordModal(!showForgotPasswordModal);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      setError(null);
      
      const userData = await LoginModel.login(email, password);

      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${apiBaseUrl}/users/info`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${userData.tokenType} ${userData.accessToken}`, 
        },
      };

      const response = await axios.request(config);
        
      setAuthUser(userData, response.data); 
      setIsLoggedIn(true); 

      navigate('/intern-dashboard');
      setIsLoading(false);
    } catch (err) {
      if(err.response.status === 422) {
        setAllowPath(true);  
        navigate('/activate-account', { state: { email: email, login: true } });
      }
      setIsLoading(false);
      if (err.response && err.response.data && err.response.data.errors) {
        const serverError = err.response.data.errors[0].message;
        setError(serverError);
      } else {
        setError("Login failed. Please try again.");
      }
      console.error("Error during login:", err);
    }
  };

  return (
    <LoginView
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      handleLogin={handleLogin}
      showForgotPasswordModal={showForgotPasswordModal}
      handleModalAction={handleModalAction}
      isLoading={isLoading}
    />
  );
};

export default LoginController;
