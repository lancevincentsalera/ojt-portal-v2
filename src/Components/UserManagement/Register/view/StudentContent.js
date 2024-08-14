import React from "react";

const StudentContent = () => {
  return (
    <form className="register-content">
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

      <input
        name="Program"
        className="program"
        type="text"
        placeholder="Degree Program"
      />
      <input
        name="IdNumber"
        className="idNumber"
        type="text"
        placeholder="ID Number"
      />
      <input name="Email" className="email" type="text" placeholder="Email" />
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
    </form>
  );
};

export default StudentContent;
