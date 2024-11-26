import React from "react";

const AssignPlanModalView = ({
  handleAssignModalAction,
  handleChange,
  handleAssignPlanAction,
  students,
  trainingPlanDetails,
}) => {
  return (
    <>
      <div className="modal-overlay" onClick={handleAssignModalAction}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading">Assign Training Plan</p>
            <span className="close" onClick={handleAssignModalAction}>
              &times;
            </span>
          </div>
          <form
            className="modal-form no-subh"
            onSubmit={(e) => {
              e.preventDefault();
              handleAssignPlanAction();
            }}
          >
            <select
              name="studentId"
              id="trainee"
              defaultValue={""}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Trainee
              </option>
              {students.interns.map((student) => (
                <option key={student.user.id} value={student.user.id}>
                  {student.user.firstName} {student.user.lastName} -{" "}
                  {student.division}
                </option>
              ))}
            </select>
            <p className="modal-sub-heading" style={{ margin: "0" }}>
              Add Task Due Dates
            </p>
            {trainingPlanDetails.tasks.map((task, i) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "50%" }}> {task.title}</span>
                  <input
                    key={task.id}
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    placeholder="Due Date"
                    style={{ width: "30%" }}
                    onChange={(e) => handleChange(e, i)}
                  />
                </div>
              );
            })}
            <div className="button-group double">
              <button
                type="button"
                className="button-secondary"
                onClick={handleAssignModalAction}
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
    </>
  );
};

export default AssignPlanModalView;
