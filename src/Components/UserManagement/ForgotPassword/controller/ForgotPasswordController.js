import React, { useState, useEffect } from "react";
import ForgotPasswordView from "../view/ForgotPasswordView";
import { ForgotPasswordModel } from "../model/ForgotPasswordModel";
import axios from "axios";
import { useGlobalState } from "../../../Globals/variables";
import { useLocation, useNavigate } from "react-router-dom";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const ForgotPasswordController = () => {
  const [formData, setFormData] = useState(ForgotPasswordModel);
  const { setIsLoading, setError, setSuccess } = useGlobalState();
  const email = useLocation().state?.email;
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.success) {
      const timer = setTimeout(() => {
        navigate("/"); 
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [formData.success, navigate]);

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
        const response = await axios.patch(`${apiBaseUrl}/users/reset/password`, {
          email: email,
          code: formData.ResetCode, 
          newPassword: formData.Password, 
        });
        setError(null);
        setSuccess(response.data + ". Redirecting to login...");
        setFormData((prevData) => ({
          ...prevData,
          success: true,
        }));
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
