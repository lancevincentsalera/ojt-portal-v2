import React, { useState } from "react";
import axios from "axios";
import ForgotPasswordModalView from "../view/ForgotPasswordModalView";
import { useNavigate } from "react-router-dom";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const ForgotPasswordModalController = ({ showModal, handleModalAction }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();   

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Email is required.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.patch(`${apiBaseUrl}/users/forget/password?email=${email}`);
      
      if (response.status === 200) {
        navigate('/forgot-password', { state: { email } });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <ForgotPasswordModalView
      showModal={showModal}
      handleModalAction={handleModalAction}
      handleSubmit={handleSubmit}
      email={email}
      handleEmailChange={handleEmailChange}
      error={error}
      isLoading={isLoading}
    />
  );
};

export default ForgotPasswordModalController;
