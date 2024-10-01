import React, { useState } from "react";
import ForgotPasswordView from "../view/ForgotPasswordView";
import { ForgotPasswordModel } from "../model/ForgotPasswordModel";
import axios from "axios";
import { useGlobalState } from "../../../Globals/variables";
import { useLocation } from "react-router-dom";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const ForgotPasswordController = () => {
  const [formData, setFormData] = useState(ForgotPasswordModel);
  const { setIsLoading, setError } = useGlobalState();
  const email = useLocation.state?.email;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.Password === formData.ConfirmPassword) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${apiBaseUrl}/users/reset/password`, {
          email: email,
          code: formData.ResetCode, 
          newPassword: formData.Password, 
        });
        console.log("Password has been reset successfully!");
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("An error occurred while resetting your password.");
      }
    } else {
      setError("Passwords do not match.");
    }
  };
  

  return (
    <ForgotPasswordView
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default ForgotPasswordController;
