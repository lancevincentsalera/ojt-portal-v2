import React, { useState } from "react";
import { Modal, Table, Checkbox } from "antd";
import { useAuth } from "../Common/AuthContext";
import axios from "axios";
import OkayModal from "../Common/Modals/OkayModal";
import ErrorModal from "../Common/Modals/ErrorModal";
import LoadingModal from "../Common/Modals/LoadingModal";
import PromptModal from "../Common/Modals/PromptModal";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const AsyncModal = ({ isOpen, setIsOpen, availableMentors = [], loading }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedMentors, setSelectedMentors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const { userInfo } = useAuth();
  const mentorId = userInfo?.user?.id;

  const handleConfirm = async () => {
    setConfirmLoading(true);
    try {
      const requests = selectedMentors.map((submentorId) => {
        return axios.post(
          `${apiBaseUrl}/submentor`,
          null,
          {
            params: { mentorId, submentorId },
          }
        );
      });
      await Promise.all(requests);
      setSuccess(true);
      setSelectedMentors([]);
      setIsOpen(false);
    } catch (error) {
      console.log(error)
      setShowPrompt(false);
      setError(error.response.data.errors[0].code + ': ' + error.response.data.errors[0].message);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedMentors([]);
  };

  const handleCheckboxChange = (mentorId, isChecked) => {
    setSelectedMentors((prev) =>
      isChecked ? [...prev, mentorId] : prev.filter((id) => id !== mentorId)
    );
  };

  const confirmAddition = () => {
    if (selectedMentors.length > 0) {
      setShowPrompt(true);
    } else {
      setError("Please select at least one mentor to add.");
    }
  };

  const columns = [
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <Checkbox
          onChange={(e) => handleCheckboxChange(record.id, e.target.checked)}
        />
      ),
      width: "10%",
      align: "center",
      className: "text-xs",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "10%",
      className: "text-xs",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      width: "20%",
      className: "text-xs",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
      width: "20%",
      className: "text-xs",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: "center",
      width: "20%",
      className: "text-xs",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      align: "center",
      width: "20%",
      className: "text-xs",
    },
  ];

  const dataSource =
  availableMentors
    ?.filter((mentor) => mentor.user.id !== mentorId) 
    .map((mentor) => ({
      key: mentor.user.id,
      id: mentor.user.id,
      firstName: mentor.user.firstName,
      lastName: mentor.user.lastName,
      department: mentor.department,
      designation: mentor.designation,
    })) || [];

  return (
    <>
      <Modal
        title="Add Submentor"
        open={isOpen}
        onOk={confirmAddition}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        centered
        width={1000}
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
        {loading ? (
          <p className="text-xs flex items-center justify-center">Loading mentors...</p>
        ) : (
          <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              scroll={{ x: true }}
            />
          </div>
        )}
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
        message="Submentors added successfully!"
      />
      <PromptModal
        open={showPrompt}
        onClose={() => setShowPrompt(false)}
        onConfirm={handleConfirm}
        message={`Are you sure you want to add the selected ${selectedMentors.length} mentor(s) as submentor(s)?`}
      />
    </>
  );
};

export default AsyncModal;
