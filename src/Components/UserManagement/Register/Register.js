import React from "react";

const Register = () => {
  return (
    <div className="container">
      <div className="register">
        <span className="heading">Register</span>
        <div className="register-tabs">
          <div className="tab">Student</div>
          <div className="tab">Supervisor</div>
        </div>

        <div className="register-content">
          <div className="name">
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
          <input
            name="Email"
            className="email"
            type="text"
            placeholder="Email"
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
        <a href="/">Back to Login</a>
      </div>
    </div>
  );
};

export default Register;
