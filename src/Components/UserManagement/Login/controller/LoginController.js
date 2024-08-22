import React, { useState } from "react";
import LoginView from "../view/LoginView";

const LoginController = ({ view }) => {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleModalAction = () =>
    setShowForgotPasswordModal(!showForgotPasswordModal);

  return (
    <LoginView
      showForgotPasswordModal={showForgotPasswordModal}
      handleModalAction={handleModalAction}
    />
  );
};

export default LoginController;
