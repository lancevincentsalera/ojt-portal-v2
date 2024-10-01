import React, { useState } from "react";
import LoginView from "../view/LoginView";
import LoginModel from "../model/LoginModel"; 
import { useNavigate } from 'react-router-dom';

const LoginController = ({ view }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();   
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleModalAction = () =>
    setShowForgotPasswordModal(!showForgotPasswordModal);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      setError(null); 
      const userData = await LoginModel.login(email, password); 
      console.log("Login successful", userData); 
      navigate('/intern-dashboard'); 
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const serverError = err.response.data.errors[0].message;
      setError(serverError);      
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
