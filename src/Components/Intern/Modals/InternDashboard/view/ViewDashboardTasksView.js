import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingModal from "../../../../Common/Modals/LoadingModal";
import OkayModal from "../../../../Common/Modals/OkayModal";
import ErrorModal from "../../../../Common/Modals/ErrorModal";
import { useAuth } from "../../../../Common/AuthContext";
import PromptModal from "../../../../Common/Modals/PromptModal";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const formatStatusText = (status) => {
  return status
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const ViewDashboardTasksView = ({ showModal, handleModalAction, selectedTask, fetchTrainingPlan }) => {
  const { userInfo } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [checkboxVisible, setCheckboxVisible] = useState(true);
  const [checkboxLabel, setCheckboxLabel] = useState("Mark as Completed");

  console.log(selectedTask);

  useEffect(() => {
    if (selectedTask) {
      const { taskStatus, dueDate } = selectedTask;

      if (taskStatus === "Done" || taskStatus === "DoneLate" || taskStatus === "Completed") {
        setCheckboxVisible(false);
      } else {
        setCheckboxVisible(true);
      }

      if (taskStatus === "NotStarted") {
        setCheckboxLabel("Mark as In Progress");
      } else {
        setCheckboxLabel("Mark as Completed");
      }

      if (new Date() > new Date(dueDate) && taskStatus !== "Done") {
        setCheckboxLabel("Mark as Done Late");
      }
    }
  }, [selectedTask]);

  const handleCheckboxChange = () => {
    setTaskCompleted(!taskCompleted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let updatedStatus;

      if (selectedTask.taskStatus === "NotStarted") {
        updatedStatus = 'InProgress';
      } else if (selectedTask.taskStatus === "InProgress") {
        if (selectedTask.dueDate) {
          updatedStatus = new Date() > new Date(selectedTask.dueDate) ? "DoneLate" : "Done";
        } else {
          updatedStatus = "Done"; 
        }
      }

      // Show prompt modal when changing status
      if (updatedStatus) {
        setShowPromptModal(true);
        return; // Exit early to wait for user confirmation
      }

      await axios.patch(
        `${apiBaseUrl}/tasks/${selectedTask.trainingTask.id}/user/${userInfo.user.id}`,
        null,
        { params: { updatedStatus } }
      );
      handleModalAction();
      fetchTrainingPlan();
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to update task status.");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle prompt confirmation
  const handlePromptConfirm = async () => {
    setShowPromptModal(false); // Close the prompt modal
    setIsSubmitting(true); // Start submitting state

    try {
      let updatedStatus;

      if (selectedTask.taskStatus === "NotStarted") {
        updatedStatus = 'InProgress';
      } else if (selectedTask.taskStatus === "InProgress") {
        if (selectedTask.dueDate) {
          updatedStatus = new Date() > new Date(selectedTask.dueDate) ? "DoneLate" : "Done";
        } else {
          updatedStatus = "Done"; 
        }
      }

      await axios.patch(
        `${apiBaseUrl}/tasks/${selectedTask.trainingTask.id}/user/${userInfo.user.id}`,
        null,
        { params: { updatedStatus } }
      );

      handleModalAction();
      fetchTrainingPlan();
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to update task status.");
      setIsError(true);
    } finally {
      setIsSubmitting(false); // End submitting state
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={handleModalAction}></div>
      <div className="modal">
        <div className="modal-content" style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <div className="modal-header">
            <p className="heading">View Task Details</p>
          </div>
          <form className="modal-form no-subh" onSubmit={handleSubmit}>
            <div className="view-task-details">
              <div className="view-task-group">
                <p className="view-task-title">Task Title</p>
                <p className="view-task-desc">{selectedTask.trainingTask.title}</p>
              </div>

              <div className="view-task-group">
                <p className="view-task-title">Description</p>
                <p className="view-task-desc">{selectedTask.trainingTask.description}</p>
              </div>

              <div className="view-task-group">
                <p className="view-task-title">Tech Stacks</p>
                <ul className="view-task-desc">
                  {selectedTask.trainingTask.techStacks.map((tech) => (
                    <li key={tech.id} style={{ fontSize: 15 }}>
                      {tech.name} - {tech.type} ({tech.description})
                    </li>
                  ))}
                </ul>
              </div>

              <div className="view-task-group">
                <p className="view-task-title">Skills</p>
                <ul className="view-task-desc">
                  {selectedTask.trainingTask.skills.map((skill) => (
                    <li key={skill.id} style={{ fontSize: 15 }}>
                      {skill.name} - {skill.description}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="view-task-group">
                <p className="view-task-title">Task Status</p>
                <p className="view-task-desc">{formatStatusText(selectedTask.taskStatus)}</p>
              </div>

              <div className="view-task-group">
                <p className="view-task-title">Due Date</p>
                <p className="view-task-desc">
                  {selectedTask.dueDate ? selectedTask.dueDate : "No due date available"}
                </p>
              </div>

              {checkboxVisible && (
                <div className="mark-check">
                  <input
                    type="checkbox"
                    id="markComplete"
                    className="checkbox"
                    checked={taskCompleted}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="markComplete" className="checkbox-label">
                    {checkboxLabel}
                  </label>
                </div>
              )}
            </div>
            <div className="button-group">
              {/* Remove Save button if task status is Done or DoneLate */}
              {!(selectedTask.taskStatus === "Done" || selectedTask.taskStatus === "DoneLate" || selectedTask.taskStatus === "Completed") && (
                <button type="submit" className="button-main" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              )}
              <button type="button" className="button-secondary" onClick={handleModalAction}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>

      <LoadingModal open={isSubmitting} />
      <OkayModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        message="Task status updated successfully!"
      />
      <ErrorModal
        open={isError}
        onClose={() => setIsError(false)}
        errorMessage={errorMessage}
      />
      <PromptModal
        open={showPromptModal}
        centered
        onClose={() => setShowPromptModal(false)}
        onConfirm={handlePromptConfirm} // Call the new function on confirm
        message="Are you sure you want to change the task status?"
      />
    </>
  );
};

export default ViewDashboardTasksView;
