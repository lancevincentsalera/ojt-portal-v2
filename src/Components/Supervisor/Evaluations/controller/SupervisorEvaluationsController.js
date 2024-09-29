import React, { useEffect, useState } from "react";
import SupervisorEvaluationsView from "../view/SupervisorEvaluationsView";
import { Evaluations } from "../model/SupervisorEvaluationsModel";

const SupervisorEvaluationsController = () => {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState({
    midterm: true,
    final: false,
  });
  const [page, setPage] = useState(1);
  const [dataPerPage] = useState(
    Array.from({ length: Math.ceil(Evaluations.length / 15) }, (_, i) =>
      Evaluations.slice(i * 15, i * 15 + 15)
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

  const handleTabChange = (m, f) => {
    setTab({ midterm: m, final: f });
  };

  const handleModalAction = () => setShowModal(!showModal);
  return (
    <SupervisorEvaluationsView
      showModal={showModal}
      handleModalAction={handleModalAction}
      tab={tab}
      handleTabChange={handleTabChange}
      page={page}
      dataByPage={dataByPage}
      dataPerPage={dataPerPage}
      handlePageChange={handlePageChange}
      handleInputPageChange={handleInputPageChange}
    />
  );
};

export default SupervisorEvaluationsController;
