import React from "react";
import AddInternModal from "../AddInternModal";

const InternListView = ({ internList, tableHeaders, handleModalAction, showModal, handleFormChange, handleRegister }) => {
  return (
    <>
    {showModal && <AddInternModal handleModalAction={handleModalAction} handleFormChange={handleFormChange} handleRegister={handleRegister}/>}
    <div className="main-dashboard">
      <div className="main-header">
        <p className="main-heading">Interns under your supervision</p>
        <button type="button" className="button-main create" onClick={handleModalAction}>Add Intern</button>
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
    </>
  );
};

export default InternListView;
