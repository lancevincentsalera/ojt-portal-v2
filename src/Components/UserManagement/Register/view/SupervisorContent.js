import React from "react";

const SupervisorContent = () => {
  return (
    <div className="register-content">
      <div className="tapad">
        <input
          name="FirstName"
          className="firstName"
          type="text"
          placeholder="First Name"
        />
        <input
          name="LastName"
          className="lastName"
          type="text"
          placeholder="Last Name"
        />
      </div>

      <input name="Email" className="email" type="text" placeholder="Email" />

      <div className="tapad">
        <input
          name="CompanyName"
          className="companyName"
          type="text"
          placeholder="Company Name"
        />
        <input
          name="Position"
          className="position"
          type="text"
          placeholder="Position/Role"
        />
      </div>

      <div className="tapad">
        <input
          name="CompanyEmail"
          className="email"
          type="text"
          placeholder="Company Email"
        />
        <input
          name="CompanyContact"
          className="companyContact"
          type="text"
          placeholder="Company Contact Number"
        />
      </div>

      <input
        name="companyAddress"
        className="companyAddress"
        type="text"
        placeholder="Company Address"
      />

      <input
        name="Password"
        className="password"
        type="password"
        placeholder="Password"
      />
      <input
        name="ConfirmPassword"
        className="confirmPassword"
        type="password"
        placeholder="Confirm password"
      />
      <button type="submit" className="button-main">
        Register
      </button>
    </div>
  );
};

export default SupervisorContent;
