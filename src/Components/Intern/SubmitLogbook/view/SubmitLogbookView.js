import React from "react";

const SubmitLogbookView = () => {
  return (
    <>
      <div className="main-dashboard">
        <div className="main-header">
          <p className="main-heading">Submit Logbook Entry</p>
        </div>
        <form className="logbook-form">
          <div className="form-group">
            <label for="dateOfEntry">Date of Entry:</label>
            <input type="date" name="dateOfEntry"></input>
          </div>
          <div className="form-group">
            <label for="dateOfEntry">Activities:</label>
            <textarea
              className="large-textarea"
              required
              placeholder="Describe the activities you performed..."
            />
          </div>
          <button type="submit" className="button-main">
            Submit Logbook
          </button>
        </form>
      </div>
    </>
  );
};

export default SubmitLogbookView;
