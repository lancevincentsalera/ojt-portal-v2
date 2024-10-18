import React from "react";

const InternListView = ({ internList, tableHeaders }) => {
  return (
    <div className="main-dashboard">
      <div className="main-header">
        <p className="main-heading">Interns under your supervision</p>
      </div>
      <div className="table-container">
        <div className="table">
          <ul className="thead">
            {tableHeaders.map((header, i) => {
              return (
                <li className="th" key={i}>
                  {header}
                </li>
              );
            })}
          </ul>
          <ul className="tbody">
            {internList.map((intern, i) => {
              return (
                <li className="tr" key={i}>
                  <p className="td">{`${intern.user.firstName} ${intern.user.lastName}`}</p>
                  <p className="td">{intern.user.email}</p>
                  <p className="td">{intern.designation}</p>
                  <p className="td">{intern.internshipStatus}</p>
                  <p className="td">{intern.hrsToRender}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InternListView;
