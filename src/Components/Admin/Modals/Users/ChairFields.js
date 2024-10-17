import React from "react";

const ChairFields = ({ handleUserChange, departments }) => {
  return (
    <>
      <div className="tapad">
        <input
          name="firstName"
          className="firstName"
          type="text"
          placeholder="First Name"
          onChange={handleUserChange}
          required
        />
        <input
          name="lastName"
          className="lastName"
          type="text"
          placeholder="Last Name"
          onChange={handleUserChange}
          required
        />
      </div>

      <input
        name="email"
        className="email"
        type="text"
        placeholder="Personal Email"
        onChange={handleUserChange}
        required
      />
      <select
        name="departmentCode"
        className="program"
        defaultValue=""
        required
        onChange={handleUserChange}
      >
        <option value="" disabled>
          Select Department
        </option>
        {departments.map((department) => (
          <option
            key={department.departmentId}
            value={department.departmentCode}
          >
            {department.departmentName}
          </option>
        ))}
      </select>
      <input
        name="designation"
        className="designation"
        type="text"
        placeholder="Position/Designation"
        onChange={handleUserChange}
        required
      />
    </>
  );
};

export default ChairFields;
