import React from "react";

const AdminFields = ({ handleUserChange }) => {
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
    </>
  );
};

export default AdminFields;
