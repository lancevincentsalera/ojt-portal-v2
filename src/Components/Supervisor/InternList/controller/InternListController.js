import React, { useEffect, useState } from "react";
import InternListView from "../view/InternListView";
import { useAuth } from "../../../Common/AuthContext";
import { GetInternList } from "../model/InternListModel";
import LoadingModal from "../../../Common/Modals/LoadingModal";
import { StudentModel } from "../../../UserManagement/Register/model/RegisterModel";
import axios from "axios";
import OkayModal from "../../../Common/Modals/OkayModal";
import ErrorModal from "../../../Common/Modals/ErrorModal";
import PromptModal from "../../../Common/Modals/PromptModal";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const InternListController = () => {
  const { userInfo, userType } = useAuth();
  const [internList, setInternList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableHeaders] = useState([
    "Name",
    "Email",
    "Designation",
    "Status",
    "Hours to Render",
  ]);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(StudentModel);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleModalAction = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchInterns = async () => {
      setLoading(true);
      try {
        const response = await GetInternList(userInfo.user.id);
        setInternList(response.interns);
      } catch (error) {
        console.error("Failed to fetch interns", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterns();
  }, [userInfo.user.id]);

  const handleRegister = async () => {
    try {
      const url = `${apiBaseUrl}/mentors/student`;
      const payload = {
        newStudent: true,
        email: userData.email,
        password: userData.password ? userData.password : null,
        firstName: userData.firstName,
        lastName: userData.lastName,
        designation: userData.designation,
        mentorId: userInfo.user.id,
        division: userData.division,
        startDate: userData.startDate || null,
        hrsToRender: parseInt(userData.hrsToRender, 10),
        shift: {
          start: userData.start || null,
          end: userData.end || null,
          dailyDutyHrs: userData.dailyDutyHrs
            ? parseInt(userData.dailyDutyHrs, 10)
            : 0,
          workingDays: userData.workingDays
            ? userData.workingDays
            : "WeekdaysOnly",
        },
      };
      const response = await axios.put(url, payload);
      if (response.status === 200 || response.status === 201) {
        setIsSuccess(true);
        setSuccessMessage("Intern added successfully");
      } else {
        setIsError(true);
        setErrorMessage("Error adding intern");
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setErrorMessage("Error adding intern: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAdd = () => {
    setIsPromptOpen(true);
  };

  const handleConfirm = async () => {
    setIsPromptOpen(false);
    await handleRegister();
  };

  return (
    <>
      <InternListView
        internList={internList}
        tableHeaders={tableHeaders}
        handleModalAction={handleModalAction}
        showModal={showModal}
        handleFormChange={handleFormChange}
        handleRegister={handleConfirmAdd}
      />
      <LoadingModal open={loading} />
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
        message={errorMessage}
      />

      <PromptModal
        onConfirm={handleConfirm}
        onClose={() => setIsPromptOpen(false)}
        open={isPromptOpen}
        message={
          "Are you sure you want to add this intern under your supervision?"
        }
      />
    </>
  );
};

export default InternListController;
