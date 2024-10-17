import React, { useEffect, useState } from "react";
import CompaniesView from "../view/CompaniesView";
import { Companies } from "../model/CompaniesModel";

const CompaniesController = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalAction = () => setShowModal(!showModal);

  return (
    <CompaniesView
      showModal={showModal}
      handleModalAction={handleModalAction}
    />
  );
};

export default CompaniesController;
