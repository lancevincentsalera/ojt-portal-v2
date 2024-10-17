import React, { useState } from "react";
import LogbookSubmissionsModalView from "../view/LogbookSubmissionsModalView";
import axios from "axios";
import { useAuth } from "../../../../Common/AuthContext";

const LogbookSubmissionsModalController = ({
  showModal,
  handleModalAction,
  logbook,
}) => {
  const [logbookId] = useState(logbook.attendance.attendanceId);
  const url =
    process.env.REACT_APP_API_BASE_URL + `/logbooks/${logbookId}/remarks`;
  const [remarks, setRemarks] = useState("");
  const { authUser } = useAuth();

  const handleChange = (e) => {
    setRemarks(e.target.value);
  };

  const submitLogbookAction = async () => {
    try {
      console.log(authUser);
      const response = await axios.patch(
        url,
        {
          remarks: remarks,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authUser.tokenType} ${authUser.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Remarks added successfully");
        handleModalAction();
        window.location.reload();
      } else {
        alert("Failed to add remarks");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <LogbookSubmissionsModalView
      showModal={showModal}
      handleModalAction={handleModalAction}
      logbook={logbook}
      handleChange={handleChange}
      submitLogbookAction={submitLogbookAction}
    />
  );
};

export default LogbookSubmissionsModalController;
