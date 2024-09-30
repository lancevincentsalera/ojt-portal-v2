import React, { useState, useEffect } from "react";
import RegisterView from "../view/RegisterView";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StudentModel } from "../model/RegisterModel";

const RegisterController = () => {
  const [userType, setUserType] = useState({
    student: true,
    supervisor: false,
  });
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [userData, setUserData] = useState(StudentModel);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [degreePrograms, setDegreePrograms] = useState([]);
  const navigate = useNavigate();

  const handleUserTypeChange = (stu, sup) => {
    setUserType({ student: stu, supervisor: sup });
  };

  const handleFormChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const confirmPasswordCheck = () => {
    if (userData.password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const checkEmptyFields = () => {
    const emptyFields = Object.keys(userData).filter((key) => {
      const value = userData[key];
  
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(
          (subValue) => subValue === "" || subValue === 0
        );
      }
  
      if (typeof value === 'string') {
        return !value.trim();
      }
  
      if (typeof value === 'number') {
        return value === 0;
      }
  
      return false;
    });
  
    if (emptyFields.length > 0) {
      setError("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!checkEmptyFields() || !confirmPasswordCheck()) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const endpoint = userType.student ? "/students" : "/mentors";
      const url = `${apiBaseUrl}${endpoint}`;

      const response = await axios.post(url, userData);

      if (response.status === 200) {
        navigate("/activate-account");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Error during registration:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetDegreePrograms = async () => {
    try {
      const url = `${apiBaseUrl}/degree-programs`;
      const response = await axios.get(url);

      if (response.status === 200) {
        // Store the degree programs in state
        setDegreePrograms(response.data);
      } else {
        setError("An error occurred while fetching the degree programs.");
      }
    } catch (error) {
      setError("Error fetching degree programs.");
      console.error("Error fetching degree programs:", error);
    }
  };

  useEffect(() => {
    handleGetDegreePrograms();
  }, []);

  return (
    <RegisterView
      handleUserTypeChange={handleUserTypeChange}
      userType={userType}
      handleFormChange={handleFormChange}
      handleRegister={handleRegister}
      handleConfirmPasswordChange={handleConfirmPasswordChange}
      error={error}
      loading={loading}
      degreePrograms={degreePrograms} 
    />
  );
};

export default RegisterController;
