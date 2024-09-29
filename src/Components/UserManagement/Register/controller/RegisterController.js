import React, { useState } from "react";
import RegisterView from "../view/RegisterView";
import axios from "../../../Common/axios";
import { useNavigate } from "react-router-dom";

const RegisterController = () => {
  const [userType, setUserType] = useState({
    student: true,
    supervisor: false,
  });
  const [userData, setUserData] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const handleRegister = async (e) => {
    setLoading(true);
    try {
      const response = userType.student
        ? await axios.post("/students", userData)
        : await axios.post("/supervisors", userData);

      console.log(response.data, "response data");
      if (response.data.status === 200) {
        alert(
          "Registration successful. Please check your email to activate your account"
        );
        navigate("/activate-account");
        setLoading(false);
      } else {
        setError("Registration failed");
        console.log(response.data);
      }
    } catch {
      alert("Registration failed");
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterView
      handleUserTypeChange={handleUserTypeChange}
      userType={userType}
      handleFormChange={handleFormChange}
      handleRegister={handleRegister}
      handleConfirmPasswordChange={handleConfirmPasswordChange}
      error={error}
      loading={loading}
    />
  );
};

export default RegisterController;
