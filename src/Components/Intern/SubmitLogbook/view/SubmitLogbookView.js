import React from "react";

const SubmitLogbookView = ({
  studentAttendance,
  attendanceId,
  setAttendanceId,
  activities,
  setActivities,
  handleSubmitLogbook,
}) => {
  return (
    <>
      <div className="main-dashboard">
        <div className="main-header">
          <p className="main-heading">Submit Logbook Entry</p>
        </div>
        <form
          className="logbook-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitLogbook();
          }}
        >
          <div className="form-group">
            <label htmlFor="attendanceId">Select Attendance Date:</label>
            {studentAttendance.length > 0 ? (
              <select
                name="attendanceId"
                value={attendanceId}
                onChange={(e) => setAttendanceId(Number(e.target.value))}
                required
              >
                <option value="">Select a date</option>
                {studentAttendance.map((attendance) => (
                  <option
                    key={attendance.attendanceId}
                    value={attendance.attendanceId}
                  >
                    {new Date(
                      attendance.timeIn.replace(/ \+\d{2}:\d{2}$/, "")
                    ).toLocaleDateString()}{" "}
                    (Time In:{" "}
                    {new Date(
                      attendance.timeIn.replace(/ \+\d{2}:\d{2}$/, "")
                    ).toLocaleTimeString()}
                    )
                  </option>
                ))}
              </select>
            ) : (
              <p style={{ fontSize: "14px", color: "#e74c3c" }}>
                All logbooks have been submitted for your attendance days.
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="activities">Activities:</label>
            <textarea
              className="large-textarea"
              required
              placeholder="Describe the activities you performed..."
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              disabled={studentAttendance.length <= 0}
            />
          </div>
          <button
            type="submit"
            className="button-main"
            disabled={studentAttendance.length <= 0}
          >
            Submit Logbook
          </button>
        </form>
      </div>
    </>
  );
};

export default SubmitLogbookView;
