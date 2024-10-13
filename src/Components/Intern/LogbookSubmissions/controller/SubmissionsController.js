import React, { useEffect, useState } from "react";
import SubmissionsView from "../view/SubmissionsView";
import axios from "axios";
import { useAuth } from "../../../Common/AuthContext";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const SubmissionsController = () => {
  const { userInfo } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [logbooks, setLogbooks] = useState([]);
  const [selectedLogbook, setSelectedLogbook] = useState(null);
  const [tab, setTab] = useState({
    pending: true,
    feedbacked: false,
  });

  useEffect(() => {
    const fetchStudentLogbooks = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/logbooks/student/${userInfo.user.id}`, {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        });
        setLogbooks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudentLogbooks();
  }, [userInfo]);

  const handleTabChange = (p, f) => {
    setTab({ pending: p, feedbacked: f });
  };

  const handleModalAction = () => {
    setShowModal(!showModal);
    if (!showModal) setSelectedLogbook(null); 
  };

  return (
    <SubmissionsView
      showModal={showModal}
      handleModalAction={handleModalAction}
      tab={tab}
      handleTabChange={handleTabChange}
      logbooks={logbooks}
      selectedLogbook={selectedLogbook}
      setSelectedLogbook={setSelectedLogbook}
    />
  );
};

export default SubmissionsController;
