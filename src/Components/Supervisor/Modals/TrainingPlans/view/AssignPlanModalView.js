import React from "react";

const AssignPlanModalView = ({ handleAssignModalAction }) => {
  return (
    <>
      <div className="modal-overlay" onClick={handleAssignModalAction}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading">Assign Training Plan</p>
            <span className="close" onClick={handleAssignModalAction}>
              &times;
            </span>
          </div>
          <p className="modal-sub-heading" style={{ marginBottom: "0" }}>
            Select Trainees
          </p>
          <form className="modal-form no-subh">
            <div className="intern-list">
              <div className="intern">
                <input type="checkbox" name="check" />
                <span>Select All</span>
              </div>
              <div className="intern">
                <input type="checkbox" name="check" />
                <span>John Doe</span>
                <span>CIT-U</span>
              </div>
              <div className="intern">
                <input type="checkbox" name="check" />
                <span>John Doe</span>
                <span>CIT-U</span>
              </div>
              <div className="intern">
                <input type="checkbox" name="check" />
                <span>John Doe</span>
                <span>CIT-U</span>
              </div>
              <div className="intern">
                <input type="checkbox" name="check" />
                <span>John Doe</span>
                <span>CIT-U</span>
              </div>
              <div className="intern">
                <input type="checkbox" name="check" />
                <span>John Doe</span>
                <span>CIT-U</span>
              </div>
              <div className="intern">
                <input type="checkbox" name="check" />
                <span>John Doe</span>
                <span>CIT-U</span>
              </div>
              <div className="intern">
                <input type="checkbox" name="check" />
                <span>John Doe</span>
                <span>CIT-U</span>
              </div>
              <div className="intern">
                <input type="checkbox" name="check" />
                <span>John Doe</span>
                <span>CIT-U</span>
              </div>
              <div className="intern">
                <input type="checkbox" name="check" />
                <span>John Doe</span>
                <span>CIT-U</span>
              </div>
              <div className="intern">
                <input type="checkbox" name="check" />
                <span>John Doe</span>
                <span>CIT-U</span>
              </div>
              <div className="intern">
                <input type="checkbox" name="check" />
                <span>John Doe</span>
                <span>CIT-U</span>
              </div>
            </div>
            <div className="button-group double">
              <button
                type="button"
                className="button-secondary"
                onClick={handleAssignModalAction}
              >
                Cancel
              </button>
              <button type="submit" className="button-main">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AssignPlanModalView;
