import React, { useEffect, useState } from "react";
import UsersView from "../view/UsersView";
import { Users } from "../model/UsersModels";

const UsersController = () => {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [dataPerPage] = useState(
    Array.from({ length: Math.ceil(Users.length / 15) }, (_, i) =>
      Users.slice(i * 15, i * 15 + 15)
    )
  );
  const [dataByPage, setDataByPage] = useState([]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= dataPerPage.length) {
      setPage(newPage);
    }
  };

  const handleInputPageChange = (e) => {
    const newValue = e.target.value;
    if (
      newValue === "" ||
      (Number(newValue) > 0 && Number(newValue) <= dataPerPage.length)
    ) {
      setPage(Number(newValue));
    }
  };

  useEffect(() => {
    console.log(page);
    if (page > 0 && dataPerPage.length > 0) {
      setDataByPage(dataPerPage[page - 1]);
    }
  }, [page, dataPerPage]);

  const handleModalAction = () => setShowModal(!showModal);

  return (
    <UsersView
      page={page}
      dataByPage={dataByPage}
      dataPerPage={dataPerPage}
      handlePageChange={handlePageChange}
      handleInputPageChange={handleInputPageChange}
      showModal={showModal}
      handleModalAction={handleModalAction}
    />
  );
};

export default UsersController;
