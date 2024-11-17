import React, { useState, useEffect, useMemo } from "react";
import RegisterView from "../view/RegisterView";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StudentModel } from "../model/RegisterModel";
import { useAuth } from "../../../Common/AuthContext";
import { useGlobalState } from "../../../Globals/variables";
import { handleGetDegreePrograms } from "../../../../Functions/common";

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
  const [selectedDegreeProgram, setSelectedDegreeProgram] = useState(null);
  const { setAllowPath } = useGlobalState();

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

      console.log("userData", userData);
      const payload = { ...userData, newStudent: true } 
      // userType.student ? // {
          //     newStudent: true,
          //     email: userData.email,
          //     password: userData.password ? userData.password : null,
          //     firstName: userData.firstName,
          //     lastName: userData.lastName,
          //     studentId: userData.studentId,
          //     degreeProgramId: parseInt(userData.degreeProgramId, 10),
          //     designation: userData.designation,
          //     mentorId: userData.mentorId
          //       ? parseInt(userData.mentorId, 10)
          //       : 0,
          //     teacherId: userData.teacherId
          //       ? parseInt(userData.teacherId, 10)
          //       : 0,
          //     division: userData.division || null,
          //     startDate: userData.startDate || null,
          //     hrsToRender: parseInt(userData.hrsToRender, 10),
          //     shift: {
          //       start: userData.start || null,
          //       end: userData.end || null,
          //       dailyDutyHrs: userData.dailyDutyHrs
          //         ? parseInt(userData.dailyDutyHrs, 10)
          //         : 0,
          //       workingDays: userData.workingDays
          //         ? userData.workingDays
          //         : "WeekdaysOnly",
          //     },
          //   }
        // : {
        //     email: userData.email,
        //     password: userData.password,
        //     firstName: userData.firstName,
        //     lastName: userData.lastName,
        //     company: {
        //       companyName: userData.companyName,
        //       contactNo: userData.contactNo,
        //       contactEmail: userData.contactEmail,
        //       address: {
        //         street: userData.street,
        //         city: userData.city,
        //         state: userData.state,
        //         country: userData.country,
        //       },
        //     },
        //     department: userData.department,
        //     designation: userData.designation,
        //   };

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
    handleGetDegreePrograms(setDegreePrograms, setError);
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
