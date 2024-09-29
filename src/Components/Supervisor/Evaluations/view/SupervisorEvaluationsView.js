import React from "react";
import FinalEvaluations from "../FinalEvaluations";
import MidtermEvaluations from "../MidtermEvaluations";

const SupervisorEvaluationsView = ({
  showModal,
  handleModalAction,
  tab,
  handleTabChange,
  page,
  dataByPage,
  dataPerPage,
  handlePageChange,
  handleInputPageChange,
}) => {
  return (
    <>
      <div className="main-dashboard">
        <div className="main-header">
          <p className="main-heading">Intern Evaluation</p>
        </div>
        <div className="tabs">
          <div
            className={tab.midterm ? "tab active" : "tab"}
            onClick={() => {
              handleTabChange(true, false);
            }}
          >
            Midterm
          </div>
          <div
            className={tab.final ? "tab active" : "tab"}
            onClick={() => {
              handleTabChange(false, true);
            }}
          >
            Final
          </div>
        </div>
        {tab.midterm && (
          <MidtermEvaluations
            showModal={showModal}
            handleModalAction={handleModalAction}
            page={page}
            dataByPage={dataByPage}
            dataPerPage={dataPerPage}
            handlePageChange={handlePageChange}
            handleInputPageChange={handleInputPageChange}
          />
        )}
        {tab.final && (
          <FinalEvaluations
            showModal={showModal}
            handleModalAction={handleModalAction}
            page={page}
            dataByPage={dataByPage}
            dataPerPage={dataPerPage}
            handlePageChange={handlePageChange}
            handleInputPageChange={handleInputPageChange}
          />
        )}
      </div>
    </>
  );
};

export default SupervisorEvaluationsView;
