import React from "react";
import Pagination from "../../Common/Pagination";

const TopPerformingInterns = () => {
  return (
    <div className="large-card-container">
      <div className="large-card-heading">Most Outstanding Interns</div>
      <div className="large-card-list">
        <div className="list-value">
          <p className="intern-name">Jane Doe</p>
          <p className="intern-department">Software Development</p>
          <button type="button" className="button-main create">
            View
          </button>
        </div>
        <div className="list-value">
          <p className="intern-name">Chris Evans</p>
          <p className="intern-department">Software Development</p>
          <button type="button" className="button-main create">
            View
          </button>
        </div>
        <div className="list-value">
          <p className="intern-name">Jessica Alba</p>
          <p className="intern-department">Project Mangement</p>
          <button type="button" className="button-main create">
            View
          </button>
        </div>
        <div className="list-value">
          <p className="intern-name">Michael Ross</p>
          <p className="intern-department">Quality Assurance</p>
          <button type="button" className="button-main create">
            View
          </button>
        </div>
      </div>

      <Pagination page={1} dataPerPage={["yes"]} />
    </div>
  );
};

export default TopPerformingInterns;
