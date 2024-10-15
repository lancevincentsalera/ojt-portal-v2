import React from "react";
import { Progress } from "antd";
import { Line } from "@ant-design/plots"; // Make sure @ant-design/plots is installed
import ViewDashboardTasksController from "../../Modals/InternDashboard/controller/ViewDashboardTasksController";
import { useAuth } from "../../../Common/AuthContext";

const InternDashboardView = ({ showModal, handleModalAction }) => {
  const { userInfo } = useAuth();

  // Calculate progress based on rendered hours and man-days
  const progressPercentage = ((userInfo.shift.totalHrsRendered / userInfo.hrsToRender) * 100).toFixed(2);
  const manDaysPercentage = ((userInfo.shift.totalManDaysRendered / userInfo.manDays) * 100).toFixed(2);

  // Example chart data for rendered hours over days
  const chartData = [
    { day: 1, hoursRendered: 4 },
    { day: 2, hoursRendered: 8 },
    { day: 3, hoursRendered: 7 },
    { day: 4, hoursRendered: 8 },
  ];

  const config = {
    data: chartData,
    xField: "day",
    yField: "hoursRendered",
    point: {
      size: 5,
      shape: 'diamond',
    },
    color: "#4caf50",
  };

  return (
    <>
      {showModal && (
        <ViewDashboardTasksController
          showModal={showModal}
          handleModalAction={handleModalAction}
        />
      )}
      <div className="main-dashboard">
        {/* Internship Details */}
        <div className="dashboard">
          <p className="heading">Internship Details</p>
          <div className="dashboard-container details">
            <div className="dashboard-group">
              <p className="dashboard-heading">Student ID</p>
              <p className="detail">{userInfo.studentId}</p>
            </div>
            <div className="dashboard-group">
              <p className="dashboard-heading">Intern Name</p>
              <p className="detail">
                {userInfo.user.firstName} {userInfo.user.lastName}
              </p>
            </div>
            <div className="dashboard-group">
              <p className="dashboard-heading">Man-days</p>
              <p className="detail">{userInfo.manDays}</p>
            </div>
            <div className="dashboard-group">
              <p className="dashboard-heading">Hours To Render</p>
              <p className="detail">{userInfo.hrsToRender}</p>
            </div>
            <div className="dashboard-group">
              <p className="dashboard-heading">Total Rendered Hours</p>
              <p className="detail">{(userInfo.shift.totalHrsRendered).toFixed(2)}</p>
            </div>
            <div className="dashboard-group">
              <p className="dashboard-heading">Expected End Date</p>
              <p className="detail">{userInfo.endDate}</p>
            </div>
            <div className="dashboard-group">
              <p className="dashboard-heading">Department/Division</p>
              <p className="detail">{userInfo.division}</p>
            </div>
            <div className="dashboard-group">
              <p className="dashboard-heading">Designation</p>
              <p className="detail">{userInfo.designation}</p>
            </div>
            <div className="dashboard-group">
              <p className="dashboard-heading">Internship Status</p>
              <p className="detail">{userInfo.internshipStatus}</p>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="dashboard">
          <p className="heading">Progress</p>
          <div className="dashboard-container progress">
            <div className="dashboard-group">
              <p className="dashboard-heading">Overall Progress</p>
              <Progress
                percent={progressPercentage}
                status="active"
                strokeColor="#4caf50"
              />
            </div>
            <div className="dashboard-group">
              <p className="dashboard-heading">Man-days Progress</p>
              <Progress
                percent={manDaysPercentage}
                status="active"
                strokeColor="#1890ff"
              />
            </div>
            <div className="dashboard-group">
              <p className="dashboard-heading">Total Rendered Hours</p>
              <Progress
                percent={progressPercentage}
                status="active"
                strokeColor="#4caf50"
              />
            </div>
          </div>
        </div>

        {/* Rendered Hours Over Days */}
        <div className="dashboard">
          <p className="heading">Rendered Hours Over Days</p>
          <div className="dashboard-container chart">
            <Line
              data={[
                { day: 1, hoursRendered: 4 },
                { day: 2, hoursRendered: 8 },
                { day: 3, hoursRendered: 7 },
                { day: 4, hoursRendered: 8 },
              ]}
              xField="day"
              yField="hoursRendered"
              point={{
                size: 5,
                shape: 'diamond',
              }}
              color="#4caf50"
              xAxis={{
                tickInterval: 1, // Ensure whole numbers only
                label: {
                  formatter: (val) => parseInt(val), // Format labels as whole numbers
                },
              }}
            />
          </div>
        </div>

        {/* Tasks & Milestones */}
        <div className="dashboard">
          <p className="heading">Tasks & Milestones</p>
          <div className="dashboard-container task-list">
            {/* Task List (remains unchanged) */}
            <div className="dashboard-group task">
              <div className="task-details">
                <p className="dashboard-heading">Complete Project Proposal</p>
                <p className="detail">Due: Oct 10, 2025</p>
                <p className="status">Status: Completed</p>
              </div>
              <button
                type="button"
                className="button-main create"
                onClick={handleModalAction}
              >
                View
              </button>
            </div>
            {/* Repeat for more tasks */}
            <div className="dashboard-group task">
              <div className="task-details">
                <p className="dashboard-heading">Complete Project Proposal</p>
                <p className="detail">Due: Oct 10, 2025</p>
                <p className="status">Status: Completed</p>
              </div>
              <button
                type="button"
                className="button-main create"
                onClick={handleModalAction}
              >
                View
              </button>
            </div>
            <div className="dashboard-group task">
              <div className="task-details">
                <p className="dashboard-heading">Complete Project Proposal</p>
                <p className="detail">Due: Oct 10, 2025</p>
                <p className="status">Status: Completed</p>
              </div>
              <button
                type="button"
                className="button-main create"
                onClick={handleModalAction}
              >
                View
              </button>
            </div>
            <div className="dashboard-group task">
              <div className="task-details">
                <p className="dashboard-heading">Complete Project Proposal</p>
                <p className="detail">Due: Oct 10, 2025</p>
                <p className="status">Status: Completed</p>
              </div>
              <button
                type="button"
                className="button-main create"
                onClick={handleModalAction}
              >
                View
              </button>
            </div>

            <div className="dashboard-group task">
              <div className="task-details">
                <p className="dashboard-heading">Complete Project Proposal</p>
                <p className="detail">Due: Oct 10, 2025</p>
                <p className="status">Status: Completed</p>
              </div>
              <button
                type="button"
                className="button-main create"
                onClick={handleModalAction}
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternDashboardView;
