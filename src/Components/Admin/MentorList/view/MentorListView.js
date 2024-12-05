import React, { useState } from "react";
import TransferMentorModal from "../TransferMentorModal";

const MentorListView = ({
  mentors,
  showModal,
  handleModalAction,
  fetchAvailableMentors,
  headMentor,
  loading,
}) => {
  return (
    <>
      {showModal && (
        <TransferMentorModal
          handleModalAction={handleModalAction}
          headMentor={headMentor}
          loading={loading}
        />
      )}
      <div className="main-dashboard">
        <div className="main-header">
          <p className="main-heading">Head Mentors</p>
        </div>
        <div className="table-container">
          <div className="table">
            <ul className="thead">
              <li className="th">Name</li>
              <li className="th">Email</li>
              <li className="th">Company Name</li>
              <li className="th">Department</li>
              <li className="th">Status</li>
              <li className="th">Actions</li>
            </ul>
            <ul className="tbody">
              {mentors.map((mentor, i) => (
                <li key={i} className="tr">
                  <p className="td">{`${mentor.user.firstName} ${mentor.user.lastName}`}</p>
                  <p className="td">{mentor.user.email}</p>
                  <p className="td">{mentor.company.companyName}</p>
                  <p className="td">{mentor.department}</p>
                  <p className="td">{mentor.user.accountStatus}</p>
                  <div className="td actions">
                    <button
                      type="button"
                      className="button-main btn-active"
                      onClick={() => {
                        handleModalAction();
                        fetchAvailableMentors(mentor.user.id);
                      }}
                    >
                      Transfer Mentorship
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorListView;
