import React, { useState } from "react";
import RegisterView from "../view/RegisterView";

const RegisterController = () => {
  const [userType, setUserType] = useState({
    student: true,
    supervisor: false,
  });

  const handleUserTypeChange = (stu, sup) => {
    setUserType({ student: stu, supervisor: sup });
  };

  return (
    <RegisterView
      handleUserTypeChange={handleUserTypeChange}
      userType={userType}
    />
  );
};

export default RegisterController;
