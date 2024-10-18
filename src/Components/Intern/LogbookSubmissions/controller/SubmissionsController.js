import React, { useEffect, useState } from "react";
import SubmissionsView from "../view/SubmissionsView";
import axios from "axios";
import { useAuth } from "../../../Common/AuthContext";
import ErrorModal from "../../../Common/Modals/ErrorModal";
import LoadingModal from "../../../Common/Modals/LoadingModal";
import OkayModal from "../../../Common/Modals/OkayModal";
import PromptModal from "../../../Common/Modals/PromptModal";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const SubmissionsController = () => {
  const { userInfo, authUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [logbooks, setLogbooks] = useState([]);
  const [selectedLogbook, setSelectedLogbook] = useState(null);
  const [tab, setTab] = useState({
    pending: true,
    feedbacked: false,
  });

  // Modals state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  
  useEffect(() => {
    const fetchStudentLogbooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiBaseUrl}/logbooks/student/${userInfo.user.id}`, {
          headers: {
            Authorization: `Bearer ${authUser.accessToken}`,
          },
        });
        setLogbooks(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch logbooks.");
        setLoading(false);
      }
    };

    fetchStudentLogbooks();
  }, [userInfo, authUser]);

  const handleTabChange = (p, f) => {
    setTab({ pending: p, feedbacked: f });
  };

  const handleModalAction = () => {
    setShowModal(!showModal);
    if (!showModal) setSelectedLogbook(null); 
  };

  const handleConfirmAction = () => {
    // Example action for the prompt modal
    setSuccess(true);
    setShowPrompt(false);
  };

  return (
    <>
      <SubmissionsView
        showModal={showModal}
        handleModalAction={handleModalAction}
        tab={tab}
        handleTabChange={handleTabChange}
        logbooks={logbooks}
        selectedLogbook={selectedLogbook}
        setSelectedLogbook={setSelectedLogbook}
      />

      {/* Modals */}
      <LoadingModal open={loading} />
      <ErrorModal open={!!error} onClose={() => setError(null)} errorMessage={error} />
      <OkayModal open={success} onClose={() => setSuccess(false)} message="Action successful!" />
      <PromptModal
        open={showPrompt}
        onClose={() => setShowPrompt(false)}
        onConfirm={handleConfirmAction}
        message="Are you sure you want to proceed?"
      />
    </> 
  );
};

export default SubmissionsController;
