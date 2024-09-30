import React from "react";

const StudentContent = ({
  handleFormChange,
  handleRegister,
  handleConfirmPasswordChange,
  error,
  loading,
  degreePrograms 
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

      <select
        name="degreeProgramId" 
        className="program"
        onChange={handleFormChange}
        defaultValue="" 
      >
        <option value="" disabled>
          Select Degree Program
        </option>
        {degreePrograms.map((program) => (
          <option key={program.id} value={program.id}> 
            {program.programName}
          </option>
        ))}
      </select>

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

      {error && <div className="error">{error}</div>}

      {loading ? (
        <button type="submit" className="button-main" disabled>
          <div className="spinner"></div>
          Loading...
        </button>
      ) : (
        <button type="submit" className="button-main" onClick={handleRegister}>
          Register
        </button>
      )}
    </form>
  );
};

export default StudentContent;
