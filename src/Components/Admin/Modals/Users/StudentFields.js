import React from "react";

const workingDays = ["WeekdaysOnly", "WeekdaysAndSaturdays", "WholeWeek"];

const formatWorkingDays = (day) => {
  return day.replace(/([A-Z])/g, " $1").trim();
};

const StudentFields = ({ handleUserChange, degreePrograms, teachers }) => {
  return (
    <>
      <input
        name="studentId"
        className="idNumber"
        type="text"
        placeholder="ID Number"
        required
        onChange={handleUserChange}
      />
      <div className="tapad">
        <input
          name="firstName"
          className="firstName"
          type="text"
          placeholder="First Name"
          required
          onChange={handleUserChange}
        />
        <input
          name="lastName"
          className="lastName"
          type="text"
          placeholder="Last Name"
          required
          onChange={handleUserChange}
        />
      </div>

      <select
        name="degreeProgramId"
        className="program"
        defaultValue=""
        onChange={handleUserChange}
        required
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

      <select
        name="teacherId"
        className="program"
        defaultValue=""
        onChange={handleUserChange}
        required
      >
        <option value="" disabled>
          Select Teacher
        </option>
        {teachers.map((teacher) => (
          <option key={teacher.user.id} value={teacher.user.id}>
            {teacher.user.firstName} {teacher.user.lastName}
          </option>
        ))}
      </select>
      <div className="tapad">
        <p
          style={{
            fontSize: "0.5rem",
            marginRight: 190,
            marginLeft: 10,
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Start Date
        </p>
        <p style={{ fontSize: "0.5rem", fontWeight: "bold" }}>
          Number of Hours To Render
        </p>
      </div>
      <div className="tapad">
        <input
          name="startDate"
          className="startDate"
          type="date"
          onChange={handleUserChange}
          required
        />
        <input
          name="hrsToRender"
          className="hrsToRender"
          type="number"
          onChange={handleUserChange}
          required
        />
      </div>
      <div className="tapad">
        <p
          style={{
            fontSize: "0.5rem",
            marginRight: 190,
            marginLeft: 10,
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Start Shift
        </p>
        <p style={{ fontSize: "0.5rem", fontWeight: "bold" }}>End Shift</p>
      </div>
      <div className="tapad">
        <input
          name="shift.start"
          className="start"
          type="time"
          onChange={handleUserChange}
          required
        />
        <input
          name="shift.end"
          className="end"
          type="time"
          onChange={handleUserChange}
          required
        />
      </div>

      <input
        name="shift.dailyDutyHrs"
        className="dailyDutyHrs"
        type="number"
        placeholder="Daily Duty Hours"
        onChange={handleUserChange}
        required
      />

      <select
        name="shift.workingDays"
        className="program"
        defaultValue=""
        onChange={handleUserChange}
        required
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
          onChange={handleUserChange}
          required
        />
        <input
          name="division"
          className="division"
          type="text"
          placeholder="Division"
          onChange={handleUserChange}
          required
        />
      </div>
      <input
        name="email"
        className="email"
        type="text"
        placeholder="Email"
        onChange={handleUserChange}
        required
      />
    </>
  );
};

export default StudentFields;
