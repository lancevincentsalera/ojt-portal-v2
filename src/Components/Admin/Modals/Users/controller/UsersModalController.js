import React, { useEffect, useState } from "react";
import UsersModalView from "../view/UsersModalView";
import { UsersModalModel } from "../model/UsersModalModel";
import axios from "axios";
import { useAuth } from "../../../../Common/AuthContext";
import LoadingModal from "../../../../Common/Modals/LoadingModal";
import OkayModal from "../../../../Common/Modals/OkayModal";
import ErrorModal from "../../../../Common/Modals/ErrorModal";
import PromptModal from "../../../../Common/Modals/PromptModal";

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
  const [error, setError] = useState(null);
  const [degreePrograms, setDegreePrograms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedDegreeProgram, setSelectedDegreeProgram] = useState(null);
  const [departments, setDepartments] = useState([]);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const { authUser } = useAuth();

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    switch (e.target.value) {
      case "admin":
        setUser(adminFields);
        break;
      case "chair":
        setUser(chairFields);
        break;
      case "supervisor":
        setUser(mentorFields);
        break;
      case "student":
        setUser(internFields);
        break;
      case "instructor":
        setUser(teacherFields);
        break;
      default:
        setUser({});
        break;
    }
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("company.")) {
      setUser((prevUser) => {
        if (name.split(".").length > 2 && name.split(".")[1] === "address") {
          return {
            ...prevUser,
            company: {
              ...prevUser.company,
              address: {
                ...prevUser.company.address,
                [name.split(".")[2]]: value,
              },
            },
          };
        } else {
          return {
            ...prevUser,
            company: {
              ...prevUser.company,
              [name.split(".")[1]]: value,
            },
          };
        }
      });
    } else if (name.startsWith("shift.")) {
      setUser((prevUser) => {
        return {
          ...prevUser,
          shift: {
            ...prevUser.shift,
            [name.split(".")[1]]: value,
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

      if (name === "degreeProgramId") {
        const selectedProgram = degreePrograms.find(
          (program) => program.id === parseInt(value, 10)
        );

        if (selectedProgram) {
          setSelectedDegreeProgram(selectedProgram.departmentCode);
        } else {
          setSelectedDegreeProgram(null);
        }
      }
    }
  };

  const handleGetDegreePrograms = async () => {
    try {
      const url = `${apiBaseUrl}/degree-programs`;
      const response = await axios.get(url);

      if (response.status === 200) {
        setDegreePrograms(response.data);
      } else {
        setError("An error occurred while fetching the degree programs.");
      }
    } catch (error) {
      setError("Error fetching degree programs.");
      console.error("Error fetching degree programs:", error);
    }
  };

  const handleGetTeachers = async () => {
    if (!selectedDegreeProgram) return;
    try {
      const url = `${apiBaseUrl}/teachers/departments/${selectedDegreeProgram}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        setTeachers(response.data);
      } else {
        setError("An error occurred while fetching the teachers.");
      }
    } catch (error) {
      setError("Error fetching teachers.");
      console.error("Error fetching teachers:", error);
    }
  };

  const handleGetDepartments = async () => {
    try {
      const url = `${apiBaseUrl}/departments`;
      const response = await axios.get(url);

      if (response.status === 200) {
        setDepartments(response.data);
      } else {
        setError("An error occurred while fetching departments.");
      }
    } catch (error) {
      setError("Error fetching departments.");
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    handleGetDegreePrograms();
    handleGetDepartments();
  }, []);

  useEffect(() => {
    if (selectedDegreeProgram) {
      handleGetTeachers();
    }
  }, [selectedDegreeProgram]);

  const handleCreateUser = async () => {
    let url;
    switch (userType) {
      case "admin":
        url = `${apiBaseUrl}/admins`;
        break;
      case "chair":
        url = `${apiBaseUrl}/chairs`;
        break;
      case "supervisor":
        url = `${apiBaseUrl}/mentors`;
        break;
      case "student":
        url = `${apiBaseUrl}/students`;
        break;
      case "instructor":
        url = `${apiBaseUrl}/teachers`;
        break;
      default:
        url = `${apiBaseUrl}/admins`;
        break;
    }
    try {
      const response = await axios.post(url, user, {
        headers: {
          Authorization: `${authUser.tokenType} ${authUser.accessToken}`,
        },
      });

      console.log(response);
      if (response.status === 201 || response.status === 200) {
        alert("User created successfully!");
      } else {
        alert("Error creating user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

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
        handleCreateUser={handleCreateUser}
      />
    </>
  );
};

export default UsersModalController;
