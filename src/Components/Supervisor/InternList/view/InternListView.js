import React, { useState, useEffect } from "react";
import AddInternModal from "../AddInternModal";
import { FaPlus } from "react-icons/fa6";
import AsyncModal from "../../../Modals/AsyncModal";
import { useAuth } from "../../../Common/AuthContext";
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const InternListView = ({
  internList,
  tableHeaders,
  handleModalAction,
  showModal,
  handleFormChange,
  handleRegister,
}) => {
  const [openAddSubmentorModal, setOpenAddSubmentorModal] = useState(false);
  const [availableMentors, setAvailableMentors] = useState([]);
  const [loading, setLoading] = useState(false); 
  const { userInfo } = useAuth();

  const fetchAvailableMentors = async () => {
    setLoading(true); 
    try {
      const companyId = userInfo?.company?.companyId;
      if (!companyId) {
        console.error("Company ID is missing");
        return;
      }

      const response = await axios.get(`${apiBaseUrl}/submentor/available`, {
        params: { companyId },
      });

      setAvailableMentors(response.data.mentors);
    } catch (error) {
      console.error("Failed to fetch available mentors:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (openAddSubmentorModal) fetchAvailableMentors();
  }, [openAddSubmentorModal]);

  return (
    <>
      {showModal && (
        <AddInternModal
          handleModalAction={handleModalAction}
          handleFormChange={handleFormChange}
          handleRegister={handleRegister}
        />
      )}
      {openAddSubmentorModal && (
        <AsyncModal
          isOpen={openAddSubmentorModal}
          setIsOpen={setOpenAddSubmentorModal}
          availableMentors={availableMentors}
          loading={loading} 
        />
      )}
      <div className="main-dashboard">
        <div className="main-header flex items-center justify-between">
          <p className="main-heading">Interns under your supervision</p>
          <div className="flex gap-2">
            <button
              type="button"
              className="button-main create"
              onClick={handleModalAction}
            >
              <FaPlus size="20" />
              &nbsp; Add Intern
            </button>
            <button
              type="button"
              className="button-main create"
              onClick={() => setOpenAddSubmentorModal(true)}
            >
              <FaPlus size="20" className="mr-1" />
              Add Submentor
            </button>
          </div>
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
