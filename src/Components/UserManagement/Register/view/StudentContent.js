import React from "react";

const StudentContent = ({
  handleFormChange,
  handleRegister,
  handleConfirmPasswordChange,
}) => {
  return (
    <form className="register-content">
      <div className="tapad">
        <input
          name="firstName"
          className="firstName"
          type="text"
          placeholder="First Name"
          onChange={handleFormChange}
        />
        <input
          name="lastName"
          className="lastName"
          type="text"
          placeholder="Last Name"
          onChange={handleFormChange}
        />
      </div>

      <input
        name="degreeProgram"
        className="program"
        type="text"
        placeholder="Degree Program"
        onChange={handleFormChange}
      />
      <input
        name="studentId"
        className="idNumber"
        type="text"
        placeholder="ID Number"
        onChange={handleFormChange}
      />
      <input
        name="Email"
        className="email"
        type="text"
        placeholder="Email"
        onChange={handleFormChange}
      />
      <input
        name="password"
        className="password"
        type="password"
        placeholder="Password"
        onChange={handleFormChange}
      />
      <input
        name="ConfirmPassword"
        className="confirmPassword"
        type="password"
        placeholder="Confirm password"
        onChange={handleConfirmPasswordChange}
      />
      <button type="submit" className="button-main" onClick={handleRegister}>
        Register
      </button>
    </form>
  );
};

export default StudentContent;
