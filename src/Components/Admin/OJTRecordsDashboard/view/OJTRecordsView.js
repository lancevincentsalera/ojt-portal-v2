import React from "react";
import SearchBar from "../../../Common/SearchBar";
import Pagination from "../../Pagination";

const OJTRecordsView = ({
  page,
  dataByPage,
  dataPerPage,
  handlePageChange,
  handleInputPageChange,
}) => {
  return (
    <div className="main-dashboard">
      <div className="main-header">
        <p className="main-heading">OJT Records</p>
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
          </ul>
          <ul className="tbody">
            {Object.values(dataByPage).map((data, index) => (
              <li className="tr" key={index}>
                {Object.values(data).map((value, index) => (
                  <div className="td" key={index}>
                    {value}
                  </div>
                ))}
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
  );
};

export default OJTRecordsView;
