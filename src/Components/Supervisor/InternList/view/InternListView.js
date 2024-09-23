import React from "react";
import Pagination from "../../../Common/Pagination";
import SearchBar from "../../../Common/SearchBar";

const InternListView = ({
  page,
  dataByPage,
  dataPerPage,
  handlePageChange,
  handleInputPageChange,
}) => {
  return (
    <div className="main-dashboard">
      <div className="main-header">
        <p className="main-heading">Interns under your supervision</p>
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
                  <button type="button" className="button-main btn-active">
                    Activate
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
  );
};

export default InternListView;
