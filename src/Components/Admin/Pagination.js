import React from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
} from "react-icons/md";

const Pagination = ({
  page,
  dataPerPage,
  handlePageChange,
  handleInputPageChange,
}) => {
  return (
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
        Page &nbsp;
        <input
          className="page"
          type="number"
          value={page || ""}
          min={1}
          max={dataPerPage.length}
          onChange={handleInputPageChange}
        />
        &nbsp;/&nbsp; {dataPerPage.length}
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
  );
};

export default Pagination;
