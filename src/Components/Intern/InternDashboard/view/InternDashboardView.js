import React from "react";

const InternDashboardView = () => {
  return (
    <div className="main-dashboard">
      <div className="dashboard ">
        <p className="heading">Internship Details</p>
        <div className="dashboard-container details">
          <div className="dashboard-group">
            <p className="dashboard-heading">Intern Name</p>
            <p className="detail">John Doe</p>
          </div>
          <div className="dashboard-group">
            <p className="dashboard-heading">Company</p>
            <p className="detail">Tech Solutions Inc.</p>
          </div>
          <div className="dashboard-group">
            <p className="dashboard-heading">Duration</p>
            <p className="detail">3 Months</p>
          </div>
          <div className="dashboard-group">
            <p className="dashboard-heading">Supervisor</p>
            <p className="detail">Jane Doe</p>
          </div>
          <div className="dashboard-group">
            <p className="dashboard-heading">Department</p>
            <p className="detail">Software Development</p>
          </div>
          <div className="dashboard-group">
            <p className="dashboard-heading">Status</p>
            <p className="detail">Active</p>
          </div>
        </div>
      </div>
      <div className="dashboard ">
        <p className="heading">Progress</p>
        <div className="dashboard-container progress">
          <div className="dashboard-group">
            <p className="dashboard-heading">Overall Progress</p>
            <progress className="progress-bar" value="66" max="100" />
          </div>
          <div className="dashboard-group">
            <p className="dashboard-heading">Task Completion</p>
            <progress className="progress-bar" value="50" max="100" />
          </div>
          <div className="dashboard-group">
            <p className="dashboard-heading">Logbook Submissions</p>
            <progress className="progress-bar" value="75" max="100" />
          </div>
          <div className="dashboard-group">
            <p className="dashboard-heading">Total Rendered Hours</p>
            <progress className="progress-bar" value="80" max="100" />
          </div>
        </div>
      </div>
      <div className="dashboard ">
        <p className="heading">Tasks & Milestones</p>
        <div className="dashboard-container task-list">
          <div className="dashboard-group task">
            <div className="task-details">
              <p className="dashboard-heading">Complete Project Proposal</p>
              <p className="detail">Due: Oct 10, 2025</p>
              <p className="status">Status: Completed</p>
            </div>
            <button type="button" className="button-main create">
              View
            </button>
          </div>
          <div className="dashboard-group task">
            <div className="task-details">
              <p className="dashboard-heading">Complete Project Proposal</p>
              <p className="detail">Due: Oct 10, 2025</p>
              <p className="status">Status: Completed</p>
            </div>
            <button type="button" className="button-main create">
              View
            </button>
          </div>
          <div className="dashboard-group task">
            <div className="task-details">
              <p className="dashboard-heading">Complete Project Proposal</p>
              <p className="detail">Due: Oct 10, 2025</p>
              <p className="status">Status: Completed</p>
            </div>
            <button type="button" className="button-main create">
              View
            </button>
          </div>
          <div className="dashboard-group task">
            <div className="task-details">
              <p className="dashboard-heading">Complete Project Proposal</p>
              <p className="detail">Due: Oct 10, 2025</p>
              <p className="status">Status: Completed</p>
            </div>
            <button type="button" className="button-main create">
              View
            </button>
          </div>

          <div className="dashboard-group task">
            <div className="task-details">
              <p className="dashboard-heading">Complete Project Proposal</p>
              <p className="detail">Due: Oct 10, 2025</p>
              <p className="status">Status: Completed</p>
            </div>
            <button type="button" className="button-main create">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternDashboardView;
