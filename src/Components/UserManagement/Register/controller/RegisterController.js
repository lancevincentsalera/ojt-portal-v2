import React, { useState, useEffect } from "react";
import RegisterView from "../view/RegisterView";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StudentModel } from "../model/RegisterModel";
import { useGlobalState } from "../../../Globals/variables";

const RegisterController = () => {
  const [userType, setUserType] = useState({
    student: true,
    supervisor: false,
  });
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [userData, setUserData] = useState(StudentModel);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    error,
    setAllowPath,
    teachers,
    degreePrograms,
    handleGetDegreePrograms,
    handleGetTeachers,
  } = useGlobalState();
  const [err, setError] = useState(null);
  const [selectedDegreeProgram, setSelectedDegreeProgram] = useState(null);

  const handleUserTypeChange = (stu, sup) => {
    setUserType({ student: stu, supervisor: sup });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });

    if (name === "degreeProgramId") {
      handleDegreeProgramChange(value);
    }
  };

  const handleDegreeProgramChange = (value) => {
    const selectedProgram = degreePrograms.find(
      (program) => program.id === parseInt(value, 10)
    );

    setSelectedDegreeProgram(selectedProgram?.departmentCode || null);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const confirmPasswordCheck = () => {
    if (!userData.password || !confirmPassword) {
      return true;
    }

    if (userData.password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const checkEmptyFields = () => {
    if (
      userType.student &&
      (!userData.firstName ||
        !userData.lastName ||
        !userData.studentId ||
        !userData.email ||
        !userData.degreeProgramId)
    ) {
      setError("Please fill in all required fields for the student.");
      return false;
    } else if (
      userType.supervisor &&
      (!userData.firstName ||
        !userData.lastName ||
        !userData.email ||
        !userData.companyName ||
        !userData.department ||
        !userData.designation ||
        !userData.contactNo ||
        !userData.contactEmail ||
        !userData.street ||
        !userData.city ||
        !userData.state ||
        !userData.country)
    ) {
      setError("Please fill in all required fields for the supervisor.");
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

      const payload = { ...userData, newStudent: true };

      const response = await axios.post(url, payload);

      if (response.status === 201) {
        setAllowPath(true);
        navigate("/activate-account", { state: { email: userData.email } });
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.errors &&
        error.response.data.errors.length > 0
      ) {
        setError(error.response.data.errors[0].message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetDegreePrograms();

    if (selectedDegreeProgram) {
      handleGetTeachers(selectedDegreeProgram);
    }
  }, [selectedDegreeProgram]);

  return (
    <>
      <RegisterView
        handleUserTypeChange={handleUserTypeChange}
        userType={userType}
        handleFormChange={handleFormChange}
        handleRegister={handleRegister}
        handleConfirmPasswordChange={handleConfirmPasswordChange}
        error={err || error}
        loading={loading}
        degreePrograms={degreePrograms}
        teachers={teachers}
      />
    </>
  );
};

export default RegisterController;
