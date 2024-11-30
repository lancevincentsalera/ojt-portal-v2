import React, { useState } from "react";
import { Modal, Select } from "antd";
import { useAuth } from "../Common/AuthContext";
import LoadingModal from "../Common/Modals/LoadingModal";
import OkayModal from "../Common/Modals/OkayModal";
import PromptModal from "../Common/Modals/PromptModal";
import ErrorModal from "../Common/Modals/ErrorModal";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const AsyncModalTransferMentorship = ({ isOpen, setIsOpen, availableMentors = [], loading }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedMentor1, setSelectedMentor1] = useState(null);
  const [selectedMentor2, setSelectedMentor2] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const { userInfo } = useAuth();

  const handleConfirm = async () => {
    if (!selectedMentor1 || !selectedMentor2) {
      setError("Please select both mentors.");
      return;
    }

    if (selectedMentor1 === selectedMentor2) {
      setError("Mentor 1 and Mentor 2 must not be the same.");
      return;
    }

    setConfirmLoading(true);
    try {
      const response = await axios.patch(
        `${apiBaseUrl}/mentors/transfer/submentor`,
        {
          mentorId: selectedMentor1,  
          submentorId: selectedMentor2,  
        }
      );

      setSuccess(true);
      setIsOpen(false);
      setSelectedMentor1(null);
      setSelectedMentor2(null);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while transferring mentorship.");
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedMentor1(null);
    setSelectedMentor2(null);
    setError(null);
  };

  const confirmAddition = () => {
    if (!selectedMentor1 || !selectedMentor2) {
      setError("Please select both mentors.");
      return;
    }

    if (selectedMentor1 === selectedMentor2) {
      setError("Mentor 1 and Mentor 2 must not be the same.");
      return;
    }

    setShowPrompt(true);
  };

  return (
    <>
      <Modal
        title="Transfer Mentorship"
        open={isOpen}
        onOk={confirmAddition}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        centered
        width={800}
        footer={
          <div className="button-group flex justify-end gap-2">
            <button
              type="button"
              className="button-secondary px-4 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="button-main px-4 text-white rounded"
              onClick={confirmAddition}
            >
              Confirm
            </button>
          </div>
        }
      >
        <div className="flex items-center gap-4 text-xs">
          <Select
            placeholder={<div className="text-xs">Select Mentor 1</div>}
            className="w-1/2 max-w-[320px]"
            onChange={(value) => setSelectedMentor1(value)}
            value={selectedMentor1}
          >
            {availableMentors.map((mentor) => (
              <Select.Option key={mentor.id} value={mentor.id}>
                <div className="text-xs">{`${mentor.firstName} ${mentor.lastName}`}</div>
              </Select.Option>
            ))}
          </Select>
          <div>
            <MdOutlineArrowRightAlt size={50} />
          </div>
          <Select
            placeholder={<div className="text-xs">Select Mentor 2</div>}
            className="w-1/2 max-w-[320px]"
            onChange={(value) => setSelectedMentor2(value)}
            value={selectedMentor2}
          >
            {availableMentors.map((mentor) => (
              <Select.Option key={mentor.id} value={mentor.id}>
                <div className="text-xs">{`${mentor.firstName} ${mentor.lastName}`}</div>
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>

      <LoadingModal open={confirmLoading} />
      <ErrorModal
        open={!!error}
        onClose={() => setError(null)}
        errorMessage={error}
      />
      <OkayModal
        open={success}
        onClose={() => setSuccess(false)}
        message="Mentorship transferred successfully!"
      />
      <PromptModal
        open={showPrompt}
        onClose={() => setShowPrompt(false)}
        onConfirm={handleConfirm}
        message={`Are you sure you want to transfer the mentorship to the selected mentor?`}
      />
    </>
  );
};

export default AsyncModalTransferMentorship;