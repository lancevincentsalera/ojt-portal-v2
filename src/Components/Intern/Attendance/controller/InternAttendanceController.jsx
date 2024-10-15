import React, { useState, useEffect } from "react";
import InternAttendanceView from "../view/InternAttendanceView";
import { useAuth } from "../../../Common/AuthContext";
import axios from "axios";
import moment from "moment";  
import LoadingModal from "../../../Common/Modals/LoadingModal";
import OkayModal from "../../../Common/Modals/OkayModal";
import ErrorModal from "../../../Common/Modals/ErrorModal";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const InternAttendanceController = () => {
  const { authUser, userInfo, setTimeIn, setTimeOut, timeIn, timeOut } = useAuth();
  const [isTimeInDisabled, setIsTimeInDisabled] = useState(false);
  const [isTimeOutDisabled, setIsTimeOutDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchInternAttendance();
  }, []);

  const fetchInternAttendance = async () => {
    setIsSubmitting(true);  
    const userId = userInfo.user.id; 
    const today = moment().format("YYYY-MM-DD");

    try {
      const response = await axios.get(
        `${apiBaseUrl}/attendance/student/${userId}?start=${today}&end=${today}`,
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
      setIsSubmitting(false);  
    } catch (error) {
      setIsSubmitting(false);  
      console.error("Error fetching attendance records:", error);
    }
  };

  const handleTimeIn = async () => {
    setIsSubmitting(true);  
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
      fetchInternAttendance();
      setIsSubmitting(false);
      setIsSuccess(true);  
    } catch (error) {
      setErrorMessage("Error during Time In");
      setIsError(true); 
      setIsSubmitting(false); 
    }
  };

  const handleTimeOut = async () => {
    setIsSubmitting(true);  
    try {
      const response = await axios.patch(
        `${apiBaseUrl}/attendance/time/out?proceedTimeIn=true`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authUser.accessToken}`,
          },
        }
      );
      
      fetchInternAttendance();  
      setIsSubmitting(false);
      setIsSuccess(true);  
  
    } catch (error) {
      setErrorMessage("Error during Time Out");
      setIsError(true); 
      setIsSubmitting(false); 
    }
  };  

  return (
    <>
      <InternAttendanceView
        handleTimeIn={handleTimeIn}
        handleTimeOut={handleTimeOut}
        isTimeInDisabled={isTimeInDisabled}
        isTimeOutDisabled={isTimeOutDisabled}
        timeIn={timeIn}
        timeOut={timeOut}
      />

      <LoadingModal open={isSubmitting} />
      <OkayModal 
        open={isSuccess} 
        onClose={() => setIsSuccess(false)} 
        message="Attendance recorded successfully!"
      />
      <ErrorModal 
        open={isError} 
        onClose={() => setIsError(false)} 
        errorMessage={errorMessage}
      />
    </>
  );
};

export default InternAttendanceController;
