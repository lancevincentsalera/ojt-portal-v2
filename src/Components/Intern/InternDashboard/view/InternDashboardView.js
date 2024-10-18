import React from "react";
import { Progress, Card } from "antd";
import { Line } from "@ant-design/plots"; // Make sure @ant-design/plots is installed
import ViewDashboardTasksController from "../../Modals/InternDashboard/controller/ViewDashboardTasksController";
import { useAuth } from "../../../Common/AuthContext";

const InternDashboardView = ({ showModal, handleModalAction, studentPerformance }) => {
  const { userInfo } = useAuth();
  
  // Check if userInfo or any nested properties are null/undefined
  const progressPercentage = ((userInfo?.shift?.totalHrsRendered ?? 0) / (userInfo?.hrsToRender ?? 1) * 100).toFixed(2);

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
              <p className="detail">{userInfo?.studentId ?? "N/A"}</p>
            </div>
            <div className="dashboard-group">
              <p className="dashboard-heading">Intern Name</p>
              <p className="detail">
                {userInfo?.user?.firstName ?? "N/A"} {userInfo?.user?.lastName ?? "N/A"}
              </p>
            </div>
            <div className="dashboard-group">
              <p className="dashboard-heading">Expected End Date</p>
              <p className="detail">{userInfo?.endDate ?? "N/A"}</p>
            </div>
            <div className="dashboard-group">
              <p className="dashboard-heading">Department/Division</p>
              <p className="detail">{userInfo?.division ?? "N/A"}</p>
            </div>
            <div className="dashboard-group">
              <p className="dashboard-heading">Designation</p>
              <p className="detail">{userInfo?.designation ?? "N/A"}</p>
            </div>
            <div className="dashboard-group">
              <p className="dashboard-heading">Internship Status</p>
              <p className="detail">{userInfo?.internshipStatus ?? "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="dashboard">
          <p className="heading">Progress</p>
          <div className="dashboard-container progress">
            <div className="dashboard-group">
              <div className="flex space-x-4 ">
                <Card
                  title={<span style={{ fontSize: "20px", textAlign: "center",  }}>Attendance Count</span>}
                  style={{ width: 300, height: 150 , textAlign: "center",  }}
                >
                  <p style={{ fontSize: "15px", textAlign: "center",  }}>{studentPerformance?.attendanceCount ?? "N/A"}</p>
                </Card>
                <Card
                  title={<span style={{ fontSize: "20px", textAlign: "center",  }}>Logbook Count</span>}
                  style={{ width: 300, height: 150 , textAlign: "center",  }}
                >
                  <p style={{ fontSize: "15px", textAlign: "center",  }}>{studentPerformance?.logbookCount ?? "N/A"}</p>
                </Card>
                <Card
                  title={<span style={{ fontSize: "20px", textAlign: "center",  }}>Performance Status</span>}
                  style={{ width: 300, height: 150, textAlign: "center",  }}
                >
                  <p style={{ fontSize: "15px", textAlign: "center",  }}>{studentPerformance?.performanceStatus ?? "N/A"}</p>
                </Card>
                <Card
                  title={<span style={{ fontSize: "20px", textAlign: "center",  }}>Status Remarks</span>}
                  style={{ width: 300, height: 150, textAlign: "center",  }}
                >
                  <p style={{ fontSize: "15px", textAlign: "center",  }}>{studentPerformance?.statusRemarks ?? "N/A"}</p>
                </Card>
              </div>
              <p className="dashboard-heading">Total Rendered Hours</p>
              <Progress
                percent={progressPercentage}
                status="active"
                strokeColor="#4caf50"
              />
            </div>
          </div>
        </div>

        {/* Tasks & Milestones */}
        {/* <div className="dashboard">
          <p className="heading">Tasks & Milestones</p>
          <div className="dashboard-container task-list">
            {/* Task List (remains unchanged) */}
            {/* <div className="dashboard-group task">
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
            </div> */}
            {/* Repeat for more tasks */}
            {/* <div className="dashboard-group task"> */}
              {/* <div className="task-details">
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
            </div> */} 
            {/* <div className="dashboard-group task">
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
            </div> */}

            {/* <div className="dashboard-group task">
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
            </div> */}
          {/* </div> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default InternDashboardView;