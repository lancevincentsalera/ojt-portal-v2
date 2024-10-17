import React from "react";
import { FaPlus } from "react-icons/fa6";
import SearchBar from "../../../Common/SearchBar";
import Pagination from "../../../Common/Pagination";
import CompaniesModalController from "../../Modals/Companies/controller/CompaniesModalController";

const CompaniesView = ({ showModal, handleModalAction }) => {
  return (
    <>
      {showModal && (
        <CompaniesModalController
          showModal={showModal}
          handleModalAction={handleModalAction}
        />
      )}
      <div className="main-dashboard">
        <div className="main-header">
          <p className="main-heading">Companies</p>
          <button className="button-main create" onClick={handleModalAction}>
            <FaPlus size={20} />
            &nbsp; Create New Company
          </button>
        </div>
        <div className="table-container">
          <div className="table">
            <ul className="thead">
              <li className="th">Actions</li>
            </ul>
            <ul className="tbody">
              <li className="tr" key={index}>
                <div className="td actions">
                  <button className="button-main btn-active">Activate</button>
                  <button className="button-secondary btn-restrict">
                    Restrict
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompaniesView;
