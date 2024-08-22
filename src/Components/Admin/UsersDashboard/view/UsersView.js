import React from "react";
import { FaPlus } from "react-icons/fa6";
import SearchBar from "../../../Common/SearchBar";
import Pagination from "../../Pagination";
import UsersModalController from "../../Modals/Users/controller/UsersModalController";

const UsersView = ({
  page,
  dataByPage,
  dataPerPage,
  handlePageChange,
  handleInputPageChange,
  showModal,
  handleModalAction,
}) => {
  return (
    <>
      {showModal && (
        <UsersModalController
          showModal={showModal}
          handleModalAction={handleModalAction}
        />
      )}
      <div className="main-dashboard">
        <div className="main-header">
          <p className="main-heading">Users</p>
          <button
            type="button"
            className="button-main create"
            onClick={handleModalAction}
          >
            <FaPlus size={20} />
            &nbsp; Create New User
          </button>
        </div>
        <div className="table-container">
          <SearchBar />
          <div className="table">
            <ul className="thead">
              {dataByPage.length > 0 &&
                Object.keys(dataByPage[0]).map((key) => (
                  <li className="th" key={key}>
                    {key}
                  </li>
                ))}
              <li className="th">Actions</li>
            </ul>
            <ul className="tbody">
              {Object.values(dataByPage).map((data, index) => (
                <li className="tr" key={index}>
                  {Object.values(data).map((value, index) => (
                    <div className="td" key={index}>
                      {value}
                    </div>
                  ))}
                  <div className="td actions">
                    <button className="button-main btn-active">Activate</button>
                    <button className="button-secondary btn-restrict">
                      Restrict
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Pagination
            page={page}
            dataPerPage={dataPerPage}
            handlePageChange={handlePageChange}
            handleInputPageChange={handleInputPageChange}
          />
        </div>
      </div>
    </>
  );
};

export default UsersView;
