import React, { useEffect, useState } from "react";
import InternListView from "../view/SubmentorListView";
import { useAuth } from "../../../Common/AuthContext";
import { GetInternList } from "../model/SubmentorListModel";
import LoadingModal from "../../../Common/Modals/LoadingModal";
import { StudentModel } from "../../../UserManagement/Register/model/RegisterModel";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const SubmentorListController = () => {
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

  console.log(userInfo);

  const handleRegister = async () => {
    try {
      const url = `${apiBaseUrl}/mentors/student`;

      console.log("userData", userData);
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
      console.log(payload);
      const response = await axios.put(url, payload);
      console.log(response);
      alert("Intern added!");
    } catch (error) {
      console.log(error);
      alert("error adding intern");
    } finally {
      window.location.reload();
      setLoading(false);
    }
  };

  return (
    <>
      <InternListView
        internList={internList}
        tableHeaders={tableHeaders}
        handleModalAction={handleModalAction}
        showModal={showModal}
        handleFormChange={handleFormChange}
        handleRegister={handleRegister}
      />
      <LoadingModal open={loading} />
    </>
  );
};

export default SubmentorListController;
