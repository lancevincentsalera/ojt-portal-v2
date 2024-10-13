import React, { useEffect, useState } from "react";
import SubmitLogbookView from "../view/SubmitLogbookView";
import axios from "axios";
import { useAuth } from "../../../Common/AuthContext";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const SubmitLogbookController = () => {
  const { userInfo, authUser } = useAuth();
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [attendanceId, setAttendanceId] = useState(0);
  const [activities, setActivities] = useState("");

  const handleSubmitLogbook = async () => {
    try {
      const requestBody = {
        attendanceId,
        activities,
      };

      const response = await axios.post(`${apiBaseUrl}/logbooks`, requestBody, {
        headers: {
          Authorization: `Bearer ${authUser.accessToken}`,
        },
      });
      console.log("Logbook entry added successfully:", response.data);
    } catch (error) {
      console.error("Error adding logbook entry:", error);
    }
  };

  useEffect(() => {
    const fetchStudentAttendance = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/attendance/student/${userInfo.user.id}/logbook`, {
          headers: {
            Authorization: `Bearer ${authUser.accessToken}`,
          },
        });
        setStudentAttendance(response.data);
        console.log("Fetched attendance:", response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudentAttendance();
  }, [userInfo, authUser]);

  return (
    <SubmitLogbookView
      studentAttendance={studentAttendance}
      attendanceId={attendanceId}
      setAttendanceId={setAttendanceId}
      activities={activities}
      setActivities={setActivities}
      handleSubmitLogbook={handleSubmitLogbook}
    />
  );
};

export default SubmitLogbookController;
