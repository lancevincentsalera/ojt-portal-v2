import React from "react";
import { getCurrentDate } from "../../../../Functions/common";

const workingDays = ["WeekdaysOnly", "WeekdaysAndSaturdays", "WholeWeek"];

const formatWorkingDays = (day) => {
  return day.replace(/([A-Z])/g, " $1").trim();
};

const StudentContent = ({
  handleFormChange,
  handleRegister,
  handleConfirmPasswordChange,
  error,
  loading,
  degreePrograms,
  teachers,
}) => {
  return (
    <form className="register-content">
      <input
        name="studentId"
        className="idNumber"
        type="text"
        placeholder="ID Number"
        onChange={handleFormChange}
        required
      />
      <div className="tapad">
        <input
          name="firstName"
          className="firstName"
          type="text"
          placeholder="First Name"
          onChange={handleFormChange}
          required
        />
        <input
          name="lastName"
          className="lastName"
          type="text"
          placeholder="Last Name"
          onChange={handleFormChange}
          required
        />
      </div>

      <select
        name="degreeProgramId"
        className="program"
        onChange={handleFormChange}
        defaultValue=""
        required
      >
        <option value="" disabled>
          Select Degree Program
        </option>
        {Array.isArray(degreePrograms) &&
          degreePrograms.map((program) => (
            <option key={program.id} value={program.id}>
              {program.programName}
            </option>
          ))}
      </select>

      <select
        name="teacherId"
        className="program"
        onChange={handleFormChange}
        defaultValue=""
      >
        <option value="" disabled>
          Select Teacher
        </option>
        {Array.isArray(teachers) &&
          teachers.map((teacher) => (
            <option key={teacher.user.id} value={teacher.user.id}>
              {teacher.user.firstName} {teacher.user.lastName}
            </option>
          ))}
      </select>
      {/* <div className="tapad">
        <p style={{ fontSize: "0.5rem", marginRight: 190, marginLeft: 10, marginBottom:10, fontWeight: "bold" }}>Start Date</p>
        <p style={{ fontSize: "0.5rem", fontWeight: "bold" }}>Number of Hours To Render</p>
      </div>
      <div className="tapad">
        <input
          name="startDate"
          className="startDate"
          type="date"
          onChange={handleFormChange}
        />
        <input
          name="hrsToRender"
          className="hrsToRender"
          type="number"
          onChange={handleFormChange}
        />
      </div>
      <div className="tapad">
        <p style={{ fontSize: "0.5rem", marginRight: 190, marginLeft: 10, marginBottom:10, fontWeight: "bold" }}>Start Shift</p>
        <p style={{ fontSize: "0.5rem", fontWeight: "bold" }}>End Shift</p>
      </div>
      <div className="tapad">
        <input
          name="start"
          className="start"
          type="time"
          onChange={handleFormChange}
        />
        <input
          name="end"
          className="end"
          type="time"
          onChange={handleFormChange}
        />
      </div>

      <input
        name="dailyDutyHrs"
        className="dailyDutyHrs"
        type="number"
        placeholder="Daily Duty Hours"
        onChange={handleFormChange}
      />

      <select 
        name="workingDays" 
        className="program"
        onChange={handleFormChange}
        defaultValue="" 
      > 
        <option value="" disabled>
          Select Working Days
        </option>
        {workingDays.map((day) => (
          <option key={day} value={day}> 
            {formatWorkingDays(day)}
          </option>
        ))}
      </select>

      <div className="tapad">
        <input
          name="designation"
          className="designation"
          type="text"
          placeholder="Designation"
          onChange={handleFormChange}
        />
        <input
          name="division"
          className="division"
          type="text"
          placeholder="Division"
          onChange={handleFormChange}
        />
      </div> */}
      <input
        name="email"
        className="email"
        type="text"
        placeholder="Email"
        onChange={handleFormChange}
        required
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
