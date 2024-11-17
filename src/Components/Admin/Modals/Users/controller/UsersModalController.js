import React, { useEffect, useState } from "react";
import UsersModalView from "../view/UsersModalView";
import { UsersModalModel } from "../model/UsersModalModel";
import axios from "axios";
import { useAuth } from "../../../../Common/AuthContext";
import LoadingModal from "../../../../Common/Modals/LoadingModal";
import OkayModal from "../../../../Common/Modals/OkayModal";
import ErrorModal from "../../../../Common/Modals/ErrorModal";
import PromptModal from "../../../../Common/Modals/PromptModal";
import { useGlobalState } from "../../../../Globals/variables";

const UsersModalController = ({ showModal, handleModalAction }) => {
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState({});
  const {
    internFields,
    teacherFields,
    mentorFields,
    chairFields,
    adminFields,
  } = UsersModalModel();
  const {
    error,
    departments,
    teachers,
    degreePrograms,
    handleGetDegreePrograms,
    handleGetTeachers,
    handleGetDepartments,
  } = useGlobalState();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const { authUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDegreeProgram, setSelectedDegreeProgram] = useState(null);

  const userMapping = {
    admin: adminFields,
    chair: chairFields,
    mentor: mentorFields,
    student: internFields,
    teacher: teacherFields,
  };

  const getMappingKey = () => {
    return Object.keys(userMapping).find(
      (key) => userMapping[key] === userMapping[userType]
    );
  };

  const handleUserTypeChange = (e) => {
    const { value } = e.target;
    setUserType(value);
    setUser(userMapping[value]);
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("company.")) {
      const [, key, subKey] = name.split(".");
      setUser((prevUser) => {
        if (subKey) {
          return {
            ...prevUser,
            company: {
              ...prevUser.company,
              address: {
                ...prevUser.company.address,
                [subKey]: value,
              },
            },
          };
        }
        return {
          ...prevUser,
          company: {
            ...prevUser.company,
            [key]: value,
          },
        };
      });
    } else {
      setUser((prevUser) => {
        return {
          ...prevUser,
          [name]: value,
        };
      });
    }

    if (name === "degreeProgramId") {
      handleDegreeProgramChange(value);
    }
  };

  const handleDegreeProgramChange = (value) => {
    const selectedProgram = degreePrograms.find(
      (program) => program.id === parseInt(value, 10)
    );

    setSelectedDegreeProgram(selectedProgram?.departmentCode || null);
  };

  const handleCreateUser = async () => {
    setIsSubmitting(true);
    try {
      const url = `${apiBaseUrl}/${getMappingKey()}s`;
      const response = await axios.post(url, user, {
        headers: {
          Authorization: `${authUser.tokenType} ${authUser.accessToken}`,
        },
      });

      console.log(response);
      if (response.status === 201 || response.status === 200) {
        setIsSuccess(true);
        setSuccessMessage(`${sentenceCase(userType)} created successfully!`);
      } else {
        setIsError(true);
        throw new Error("Error creating user.");
      }
    } catch (error) {
      setErrorMessage(error);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sentenceCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const confirmActionHandler = () => {
    setIsPromptOpen(true);
  };

  const handleConfirm = async () => {
    setIsPromptOpen(false);
    await handleCreateUser();
  };

  useEffect(() => {
    handleGetDegreePrograms();
    handleGetDepartments();

    if (selectedDegreeProgram) {
      handleGetTeachers(selectedDegreeProgram);
    }
  }, [selectedDegreeProgram]);

  return (
    <>
      <UsersModalView
        showModal={showModal}
        handleModalAction={handleModalAction}
        userType={userType}
        handleUserTypeChange={handleUserTypeChange}
        handleUserChange={handleUserChange}
        degreePrograms={degreePrograms}
        teachers={teachers}
        departments={departments}
        confirmActionHandler={confirmActionHandler}
      />

      <LoadingModal open={isSubmitting} />
      <OkayModal
        open={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          window.location.reload();
        }}
        message={successMessage}
      />
      <ErrorModal
        open={isError}
        onClose={() => setIsError(false)}
        errorMessage={error || errorMessage}
      />

      <PromptModal
        open={isPromptOpen}
        onConfirm={handleConfirm}
        onClose={() => setIsPromptOpen(false)}
        message={`Are you sure you want to create this ${userType}?`}
      />
    </>
  );
};

export default UsersModalController;
