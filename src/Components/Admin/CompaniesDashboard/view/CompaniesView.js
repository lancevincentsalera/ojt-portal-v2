import React from "react";
import { FaPlus } from "react-icons/fa6";
import CompaniesModalController from "../../Modals/Companies/controller/CompaniesModalController";

const CompaniesView = ({ showModal, handleModalAction, companies }) => {
  console.log(companies);

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
          {/* <button className="button-main create" onClick={handleModalAction}>
            <FaPlus size={20} />
            &nbsp; Create New Company
          </button> */}
        </div>

        <div className="table-container">
          <div className="table">
            <ul className="thead">
              <li className="th">Company ID</li>
              <li className="th">Company Name</li>
              <li className="th">Contact No.</li>
              <li className="th">Contact Email</li>
              <li className="th">Address</li>
            </ul>

            <ul className="tbody">
              {companies.map((company) => (
                <li className="tr" key={company.companyId}>
                  <div className="td">{company.companyId}</div>
                  <div className="td">{company.companyName}</div>
                  <div className="td">{company.contactNo}</div>
                  <div className="td">{company.contactEmail}</div>
                  <div className="td">
                    {company.address.street}, {company.address.city},{" "}
                    {company.address.state}, {company.address.country}
                  </div>
                  {/* <div className="td actions">
                    <button className="button-main btn-active">Activate</button>
                    <button className="button-secondary btn-restrict">
                      Restrict
                    </button>
                  </div> */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompaniesView;
