import React from "react";
import StudentContent from "./StudentContent";
import SupervisorContent from "./SupervisorContent";

const RegisterView = ({
  handleUserTypeChange,
  userType,
  handleFormChange,
  handleRegister,
  handleConfirmPasswordChange,
  error,
  loading,
  degreePrograms
}) => {
  return (
    <div className="container">
      <div className="register">
        <span className="heading">Register</span>
        <div className="tabs">
          <div
            className={userType.student ? "tab active" : "tab"}
            onClick={() => {
              handleUserTypeChange(true, false);
            }}
          >
            Student
          </div>
          <div
            className={userType.supervisor ? "tab active" : "tab"}
            onClick={() => {
              handleUserTypeChange(false, true);
            }}
          >
            Supervisor
          </div>
        </div>
        {userType.student ? (
          <StudentContent
            handleFormChange={handleFormChange}
            handleRegister={handleRegister}
            handleConfirmPasswordChange={handleConfirmPasswordChange}
            error={error}
            loading={loading}
            degreePrograms={degreePrograms}
          />
        ) : (
          <SupervisorContent />
        )}
        <a href="/">Back to Login</a>
      </div>
    </div>
  );
};

export default RegisterView;
