import React from "react";

const SupervisorFields = ({ handleUserChange }) => {
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

      <input
        name="company.companyName"
        className="companyName"
        type="text"
        placeholder="Company Name"
        onChange={handleUserChange}
        required
      />

      <div className="tapad">
        <input
          name="department"
          className="department"
          type="text"
          placeholder="Department"
          onChange={handleUserChange}
          required
        />
        <input
          name="designation"
          className="designation"
          type="text"
          placeholder="Position/Designation"
          onChange={handleUserChange}
          required
        />
      </div>

      <div className="tapad">
        <input
          name="company.contactEmail"
          className="email"
          type="text"
          placeholder="Company Email"
          onChange={handleUserChange}
          required
        />
        <input
          name="company.contactNo"
          className="companyContact"
          type="text"
          placeholder="Company Contact Number"
          onChange={handleUserChange}
          required
        />
      </div>

      <div className="tapad">
        <input
          name="company.address.street"
          className="street"
          type="text"
          placeholder="Street"
          onChange={handleUserChange}
          required
        />
        <input
          name="company.address.city"
          className="city"
          type="text"
          placeholder="City"
          onChange={handleUserChange}
          required
        />
      </div>

      <div className="tapad">
        <input
          name="company.address.state"
          className="state"
          type="text"
          placeholder="State"
          onChange={handleUserChange}
          required
        />
        <input
          name="company.address.country"
          className="country"
          type="text"
          placeholder="Country"
          onChange={handleUserChange}
          required
        />
      </div>
    </>
  );
};

export default SupervisorFields;
