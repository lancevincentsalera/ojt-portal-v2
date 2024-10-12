import React, { useState, useEffect } from "react";
import InternAttendanceView from "../view/InternAttendanceView";
import { useAuth } from "../../../Common/AuthContext";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const InternAttendanceController = () => {
  const { authUser, setTimeIn, setTimeOut, timeIn, timeOut } = useAuth();
  const [isTimeInDisabled, setIsTimeInDisabled] = useState(false);
  const [isTimeOutDisabled, setIsTimeOutDisabled] = useState(false);
  
  useEffect(() => {
    if (timeIn) {
      setIsTimeInDisabled(true); 
    }

    if (timeOut) {
      setIsTimeOutDisabled(true); 
    }
  }, [timeIn, timeOut]);

  const handleTimeIn = async () => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/attendance/time/in`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authUser.accessToken}`,
          },
        }
      );
      const currentTimeIn = new Date().toISOString();
      setTimeIn(currentTimeIn); 
      setIsTimeInDisabled(true);
      console.log("Time In Success:", response.data);
    } catch (error) {
      console.error("Error during Time In:", error);
    }
  };

  const handleTimeOut = async () => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/attendance/time/out`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authUser.accessToken}`,
          },
        }
      );
      const currentTimeOut = new Date().toISOString();
      setTimeOut(currentTimeOut); 
      setIsTimeOutDisabled(true);
      console.log("Time Out Success:", response.data);
    } catch (error) {
      console.error("Error during Time Out:", error);
    }
  };

  return (
    <InternAttendanceView
      handleTimeIn={handleTimeIn}
      handleTimeOut={handleTimeOut}
      isTimeInDisabled={isTimeInDisabled}
      isTimeOutDisabled={isTimeOutDisabled}
    />
  );
};

export default InternAttendanceController;
