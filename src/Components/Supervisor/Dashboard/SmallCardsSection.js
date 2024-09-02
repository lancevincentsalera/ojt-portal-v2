import React from "react";

const SmallCardsSection = () => {
  return (
    <div className="small-cards-container">
      <div className="small-card">
        <p className="small-card-heading">Total Interns</p>
        <div className="value-group">
          <p className="small-card-value">120</p>
          <button type="button" className="button-main create">
            View All
          </button>
        </div>
      </div>
      <div className="small-card">
        <p className="small-card-heading">Pending Evaluations</p>
        <div className="value-group">
          <p className="small-card-value">15</p>
          <button type="button" className="button-main create">
            View All
          </button>
        </div>
      </div>
      <div className="small-card">
        <p className="small-card-heading">Interns Progress</p>
        <p className="small-card-value">70% On Track</p>
      </div>
    </div>
  );
};

export default SmallCardsSection;
