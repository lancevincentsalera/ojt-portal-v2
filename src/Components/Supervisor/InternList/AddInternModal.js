import React from "react";


const workingDays = [ 'WeekdaysOnly', 'WeekdaysAndSaturdays', 'WholeWeek' ]

const formatWorkingDays = (day) => {
  return day.replace(/([A-Z])/g, ' $1').trim(); 
};

const AddInternModal = ({handleModalAction, handleFormChange, handleRegister}) => {
    return <>
    <div className="modal-overlay" onClick={handleModalAction}></div>
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <p className="heading">Assign Training Plan</p>
          <span className="close" onClick={handleModalAction}>
            &times;
          </span>
        </div>
        <form
        className="modal-form no-subh"
        >
      <div className="tapad">
        <input
          name="firstName"
          className="firstName"
          type="text"
          placeholder="First Name"
          onChange={handleFormChange}
          required
        />
        <input
          name="lastName"
          className="lastName"
          type="text"
          placeholder="Last Name"
          onChange={handleFormChange}
          required
        />
      </div>

     

      <div className="tapad">
        <p style={{ fontSize: "0.5rem", marginRight: 190, marginLeft: 10, marginBottom:10, fontWeight: "bold" }}>Start Date</p>
        <p style={{ fontSize: "0.5rem", fontWeight: "bold" }}>Number of Hours To Render</p>
      </div>
      <div className="tapad">
        <input
          name="startDate"
          className="startDate"
          type="date"
          onChange={handleFormChange}
        />
        <input
          name="hrsToRender"
          className="hrsToRender"
          type="number"
          onChange={handleFormChange}
        />
      </div>
      <div className="tapad">
        <p style={{ fontSize: "0.5rem", marginRight: 190, marginLeft: 10, marginBottom:10, fontWeight: "bold" }}>Start Shift</p>
        <p style={{ fontSize: "0.5rem", fontWeight: "bold" }}>End Shift</p>
      </div>
      <div className="tapad">
        <input
          name="start"
          className="start"
          type="time"
          onChange={handleFormChange}
        />
        <input
          name="end"
          className="end"
          type="time"
          onChange={handleFormChange}
        />
      </div>

      <input
        name="dailyDutyHrs"
        className="dailyDutyHrs"
        type="number"
        placeholder="Daily Duty Hours"
        onChange={handleFormChange}
      />

      <select 
        name="workingDays" 
        className="program"
        onChange={handleFormChange}
        defaultValue="" 
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
          onChange={handleFormChange}
        />
        <input
          name="division"
          className="division"
          type="text"
          placeholder="Division"
          onChange={handleFormChange}
        />
      </div>
      <input
        name="email"
        className="email"
        type="text"
        placeholder="Email"
        onChange={handleFormChange}
        required
      />
      
      <div className="button-group double">
              <button
                type="button"
                className="button-secondary"
                onClick={handleModalAction}
              >
                Cancel
              </button>
              <button type="button" className="button-main" onClick={handleRegister} >
                Confirm
              </button>
            </div>
      
        </form>
      </div>
    </div>
  </>
}

export default AddInternModal;