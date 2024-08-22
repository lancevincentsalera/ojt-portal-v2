import React from "react";
import CompaniesModalView from "../view/CompaniesModalView";

const CompaniesModalController = ({ showModal, handleModalAction }) => {
  return (
    <CompaniesModalView
      showModal={showModal}
      handleModalAction={handleModalAction}
    />
  );
};

export default CompaniesModalController;
