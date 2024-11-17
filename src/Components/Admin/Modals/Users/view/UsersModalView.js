import React from "react";
import AdminFields from "../AdminFields";
import ChairFields from "../ChairFields";
import SupervisorFields from "../SupervisorFields";
import StudentFields from "../StudentFields";
import TeacherFields from "../TeacherFields";
import { FaGraduationCap } from "react-icons/fa6";

const UsersModalView = ({
  showModal,
  handleModalAction,
  userType,
  handleUserTypeChange,
  handleUserChange,
  degreePrograms,
  teachers,
  departments,
  confirmActionHandler,
}) => {
  return (
    <>
      <div className="modal-overlay" onClick={handleModalAction}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading">Create User</p>
            <span className="close" onClick={handleModalAction}>
              &times;
            </span>
          </div>
          <form
            className="modal-form no-subh"
            onSubmit={(e) => {
              e.preventDefault();
              confirmActionHandler();
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <label htmlFor="userType">User Type: &nbsp;</label>
              <select
                id="userType"
                name="userType"
                className="smaller"
                onChange={handleUserTypeChange}
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select user type
                </option>
                <option value="admin">Admin</option>
                <option value="chair">Chair</option>
                <option value="mentor">Mentor</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            {(() => {
              switch (userType) {
                case "admin":
                  return <AdminFields handleUserChange={handleUserChange} />;
                case "chair":
                  return (
                    <ChairFields
                      handleUserChange={handleUserChange}
                      departments={departments}
                    />
                  );

                case "mentor":
                  return (
                    <SupervisorFields handleUserChange={handleUserChange} />
                  );

                case "student":
                  return (
                    <StudentFields
                      handleUserChange={handleUserChange}
                      degreePrograms={degreePrograms}
                      teachers={teachers}
                    />
                  );

                case "teacher":
                  return (
                    <TeacherFields
                      handleUserChange={handleUserChange}
                      departments={departments}
                    />
                  );

                default:
                  return (
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        gap: "0.5rem",
                        color: "#ff6b6b",
                      }}
                    >
                      <FaGraduationCap size={50} />
                      Please select a user type
                    </p>
                  );
              }
            })()}
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
    </>
  );
};

export default UsersModalView;
