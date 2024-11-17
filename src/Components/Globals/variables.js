import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { reuseCommonFunctionality } from "../../Functions/common";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [departments, setDepartments] = useState([]);
  const [degreePrograms, setDegreePrograms] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [allowPath, setAllowPath] = useState(() => {
    return JSON.parse(localStorage.getItem("allowPath")) || false;
  });

  useEffect(() => {
    localStorage.setItem("allowPath", JSON.stringify(allowPath));
  }, [allowPath]);

  const getMentorLogbookSubmissions = async (mentorId, params = {}) => {
    try {
      const url = apiBaseUrl + `/logbooks/mentor/${mentorId}`;
      const response = await axios.get(url);
      return params != null && params.logbookStatus === "Pending"
        ? response.data.filter(
            (logbook) => logbook.logbookStatus === params.logbookStatus
          )
        : response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getInternInfo = async (studentId) => {
    try {
      const url = apiBaseUrl + `/students/${studentId}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getSystemGeneratedTrainingPlans = async () => {
    try {
      const url = apiBaseUrl + "/training/plans/fetch/from/api";
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetDegreePrograms = async () => {
    await reuseCommonFunctionality(
      "degree-programs",
      setDegreePrograms,
      setError,
      "An error occurred while fetching the teachers."
    );
  };

  const handleGetTeachers = async (selectedDegreeProgram) => {
    if (!selectedDegreeProgram) return;
    await reuseCommonFunctionality(
      `teachers/departments/${selectedDegreeProgram}`,
      setTeachers,
      setError,
      "An error occurred while fetching the teachers."
    );
  };

  const handleGetDepartments = async () => {
    await reuseCommonFunctionality(
      "departments",
      setDepartments,
      setError,
      "An error occurred while fetching the teachers"
    );
  };

  return (
    <GlobalStateContext.Provider
      value={{
        isLoading,
        setIsLoading,
        error,
        setError,
        success,
        setSuccess,
        apiBaseUrl,
        allowPath,
        setAllowPath,
        getMentorLogbookSubmissions,
        getInternInfo,
        getSystemGeneratedTrainingPlans,
        departments,
        teachers,
        degreePrograms,
        handleGetDegreePrograms,
        handleGetTeachers,
        handleGetDepartments,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
