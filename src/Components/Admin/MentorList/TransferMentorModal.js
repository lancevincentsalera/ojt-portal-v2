import React, { useState } from "react";
import LoadingModal from "../../Common/Modals/LoadingModal";
import axios from "axios";
import OkayModal from "../../Common/Modals/OkayModal";
import ErrorModal from "../../Common/Modals/ErrorModal";
import PromptModal from "../../Common/Modals/PromptModal";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const TransferMentorModal = ({ handleModalAction, headMentor, loading }) => {
  const [subMentorId, setSubMentorId] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  const handleTransferMentorship = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.patch(
        `${apiBaseUrl}/mentors/transfer/submentor`,
        null,
        {
          params: {
            mentorId: headMentor.user.id,
            subMentorId: subMentorId,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setIsSuccess(true);
        setSuccessMessage("Mentorship transferred successfully");
      } else {
        setIsError(true);
        setErrorMessage("Failed to transfer mentorship");
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage("Failed to transfer mentorship: ", error);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenPrompt = () => {
    setIsPromptOpen(true);
  };

  const handleConfirmPrompt = async () => {
    setIsPromptOpen(false);
    await handleTransferMentorship();
  };
  return (
    <>
      <div className="modal-overlay" onClick={handleModalAction}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading">Transfer Mentorship</p>
            <span className="close" onClick={handleModalAction}>
              &times;
            </span>
          </div>
          <form
            className="modal-form no-subh"
            onSubmit={(e) => {
              e.preventDefault();
              handleOpenPrompt();
            }}
          >
            <label style={{ marginBottom: "0.5rem" }}>
              From:{" "}
              {`${headMentor?.user?.firstName} ${headMentor?.user?.lastName}`}
            </label>
            <label htmlFor="mentor">To:</label>
            <select
              name="mentor"
              id="mentor"
              defaultValue={""}
              onChange={(e) => setSubMentorId(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Submentor
              </option>

              {headMentor &&
                headMentor.subMentorCount > 0 &&
                headMentor.subMentors.map((mentor, i) => (
                  <option key={i} value={mentor.user.id}>
                    {mentor.user.firstName} {mentor.user.lastName}
                  </option>
                ))}
            </select>
            <div className="button-group double">
              <button
                type="button"
                className="button-secondary"
                onClick={handleModalAction}
              >
                Cancel
              </button>
              <button type="submit" className="button-main">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>

      <LoadingModal open={loading || isSubmitting} />
      <OkayModal
        open={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          window.location.reload();
        }}
        message={successMessage}
      />
      <ErrorModal
        open={isError}
        onClose={() => setIsError(false)}
        errorMessage={errorMessage}
      />

      <PromptModal
        open={isPromptOpen}
        onConfirm={handleConfirmPrompt}
        onClose={() => setIsPromptOpen(false)}
        message={`Are you sure you want to transfer mentorship?`}
      />
    </>
  );
};

export default TransferMentorModal;
