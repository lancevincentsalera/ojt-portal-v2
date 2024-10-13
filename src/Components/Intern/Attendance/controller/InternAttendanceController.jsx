import React, { useState, useEffect } from "react";
import InternAttendanceView from "../view/InternAttendanceView";
import { useAuth } from "../../../Common/AuthContext";
import axios from "axios";
import moment from "moment";  

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const InternAttendanceController = () => {
  const { authUser, userInfo, setTimeIn, setTimeOut, timeIn, timeOut } = useAuth();
  const [isTimeInDisabled, setIsTimeInDisabled] = useState(false);
  const [isTimeOutDisabled, setIsTimeOutDisabled] = useState(false);

  useEffect(() => {
    fetchInternAttendance();
    if (timeIn) {
      setIsTimeInDisabled(true); 
    }

    if (timeOut) {
      setIsTimeOutDisabled(true); 
    }
  }, [timeIn, timeOut]);

  const fetchInternAttendance = async () => {
    const studentId = userInfo.studentId; 
    const today = moment().format("YYYY-MM-DD");

    try {
      const response = await axios.get(
        `${apiBaseUrl}/attendance/student/${studentId}?start=${today}&end=${today}`,
        {
          headers: {
            Authorization: `Bearer ${authUser.accessToken}`,
          },
        }
      );

      const attendanceRecords = response.data;

      if (attendanceRecords.length > 0 && attendanceRecords[0].timeIn) {
        setTimeIn(attendanceRecords[0].timeIn);
        setIsTimeInDisabled(true);
      }

      if (attendanceRecords.length > 0 && attendanceRecords[0].timeOut) {
        setTimeOut(attendanceRecords[0].timeOut);
        setIsTimeOutDisabled(true);
      }

    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  const handleTimeIn = async () => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/attendance/time/in?proceedTimeIn=true`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authUser.accessToken}`,
          },
        }
      );
      setTimeIn(response.data.timeIn);
      setIsTimeInDisabled(true); 
    } catch (error) {
      console.error("Error during Time In:", error);
    }
  };

  const handleTimeOut = async () => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/attendance/time/out?proceedTimeIn=true`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authUser.accessToken}`,
          },
        }
      );
      setTimeOut(response.data.timeOut);
      setIsTimeOutDisabled(true);
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
