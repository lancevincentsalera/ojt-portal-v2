import React from "react";
import { FaPlus } from "react-icons/fa6";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
} from "react-icons/md";

const UsersView = ({
  page,
  dataByPage,
  dataPerPage,
  handlePageChange,
  handleInputPageChange,
}) => {
  return (
    <div className="users-dashboard">
      <div className="users-header">
        <p className="heading">Users</p>
        <button className="button-main create">
          <FaPlus size={20} />
          &nbsp; Create New User
        </button>
      </div>
      <div className="table-container">
        <input
          type="text"
          name="search"
          className="search"
          placeholder="Search a user..."
        />
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
        <div className="pagination">
          <div className="left-page">
            <MdKeyboardDoubleArrowLeft
              size={20}
              onClick={() => handlePageChange(1)}
            />
            <MdKeyboardArrowLeft
              size={25}
              onClick={() => handlePageChange(page - 1)}
            />
          </div>
          <p>
            <input
              className="page"
              type="number"
              value={page || ""}
              min={1}
              max={dataPerPage.length}
              onChange={handleInputPageChange}
            />
            &nbsp;/&nbsp; 10
          </p>
          <div className="right-page">
            <MdKeyboardArrowRight
              size={25}
              onClick={() => handlePageChange(page + 1)}
            />
            <MdKeyboardDoubleArrowRight
              size={20}
              onClick={() => handlePageChange(dataPerPage.length)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersView;
