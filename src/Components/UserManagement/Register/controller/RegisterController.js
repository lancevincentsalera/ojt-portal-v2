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
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();
  const [selectedDegreeProgram, setSelectedDegreeProgram] = useState(null); // Corrected typo

  const handleUserTypeChange = (stu, sup) => {
    setUserType({ student: stu, supervisor: sup });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    
    setUserData({ ...userData, [name]: value });

    if (name === "degreeProgramId") {
      const selectedProgram = degreePrograms.find(
        (program) => program.id === parseInt(value, 10)
      );
      
      if (selectedProgram) {
        setSelectedDegreeProgram(selectedProgram.departmentCode);
      } else {
        setSelectedDegreeProgram(null); 
      }
    }
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
    if(!userData.firstName || !userData.lastName || !userData.studentId || !userData.email || !userData.degreeProgramId) {
      setError("Please fill in all required fields.");
      return false
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
  
      const payload = {
        newStudent: true,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        studentId: userData.studentId,
        degreeProgramId: parseInt(userData.degreeProgramId, 10),
        designation: userData.designation || null,
        mentorId: userData.mentorId ? parseInt(userData.mentorId, 10) : 0,
        teacherId: userData.teacherId ? parseInt(userData.teacherId, 10) : null,
        division: userData.division || null,
        startDate: userData.startDate || null,
        hrsToRender: userData.hrsToRender ? parseInt(userData.hrsToRender, 10) : null,
        shift: {
          start: userData.start || null,
          end: userData.end || null,
          dailyDutyHrs: userData.dailyDutyHrs ? parseInt(userData.dailyDutyHrs, 10) : null,
          workingDays: userData.workingDays || null,
        },
      };
  
      const response = await axios.post(url, payload);
      if (response.status === 200) {
        navigate("/activate-account");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const serverError = error.response.data.errors[0].message;
        setError(serverError);  
      } else {
        setError("Registration failed. Please try again.");
      }
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
        setDegreePrograms(response.data);
      } else {
        setError("An error occurred while fetching the degree programs.");
      }
    } catch (error) {
      setError("Error fetching degree programs.");
      console.error("Error fetching degree programs:", error);
    }
  };

  const handleGetTeachers = async () => {
    if (!selectedDegreeProgram) return; 
    try {
      const url = `${apiBaseUrl}/teachers/departments/${selectedDegreeProgram}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        setTeachers(response.data); 
      } else {
        setError("An error occurred while fetching the teachers.");
      }
    } catch (error) {
      setError("Error fetching teachers.");
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    handleGetDegreePrograms();
  }, []);

  useEffect(() => {
    if (selectedDegreeProgram) {
      handleGetTeachers();
    }
  }, [selectedDegreeProgram]); 

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
      teachers={teachers} 
    />
  );
};

export default RegisterController;
