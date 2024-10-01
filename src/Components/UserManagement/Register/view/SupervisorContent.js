import React from "react";

const SupervisorContent = ({ error, loading, handleRegister, handleFormChange, handleConfirmPasswordChange }) => {
  return (
    <form className="register-content" onSubmit={handleRegister}>
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
        name="email"
        className="email"
        type="text"
        placeholder="Personal Email"
        onChange={handleFormChange}
      />

      <input
        name="companyName"
        className="companyName"
        type="text"
        placeholder="Company Name"
        onChange={handleFormChange}
      />

      <div className="tapad">
        <input
          name="department"
          className="department"
          type="text"
          placeholder="Department"
          onChange={handleFormChange}
        />
        <input
          name="designation"
          className="designation"
          type="text"
          placeholder="Position/Designation"
          onChange={handleFormChange}
        />
      </div>

      <div className="tapad">
        <input
          name="contactEmail"
          className="email"
          type="text"
          placeholder="Company Email"
          onChange={handleFormChange}
        />
        <input
          name="contactNo"
          className="companyContact"
          type="text"
          placeholder="Company Contact Number"
          onChange={handleFormChange}
        />
      </div>

      <div className="tapad">
        <input
          name="street"
          className="street"
          type="text"
          placeholder="Street"
          onChange={handleFormChange}
        />
        <input
          name="city"
          className="city"
          type="text"
          placeholder="City"
          onChange={handleFormChange}
        />
      </div>

      <div className="tapad">
        <input
          name="state"
          className="state"
          type="text"
          placeholder="State"
          onChange={handleFormChange}
        />
        <input
          name="country"
          className="country"
          type="text"
          placeholder="Country"
          onChange={handleFormChange}
        />
      </div>

      <input
        name="password"
        className="password"
        type="password"
        placeholder="Password"
        onChange={handleFormChange}
      />
      <input
        name="confirmPassword"
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
        <button type="submit" className="button-main">
          Register
        </button>
      )}
    </form>
  );
};

export default SupervisorContent;
