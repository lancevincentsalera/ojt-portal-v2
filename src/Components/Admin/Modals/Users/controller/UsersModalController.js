import React from "react";
import UsersModalView from "../view/UsersModalView";

const UsersModalController = ({ showModal, handleModalAction }) => {
  return (
    <UsersModalView
      showModal={showModal}
      handleModalAction={handleModalAction}
    />
  );
};

export default UsersModalController;
