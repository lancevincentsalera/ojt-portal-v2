import React, { useEffect, useState } from "react";
import InstructorDashboardView from "../view/InstructorDashboardView";
import { useAuth } from "../../../Common/AuthContext";
import axios from "axios";
import LoadingModal from "../../../Common/Modals/LoadingModal";
import OkayModal from "../../../Common/Modals/OkayModal";
import ErrorModal from "../../../Common/Modals/ErrorModal";
import { Table, Checkbox, Modal } from 'antd';
import PromptModal from "../../../Common/Modals/PromptModal";
import { fetchStudentsByInstructor } from "../../Common/Functions";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const InstructorDashboardController = () => {
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { userInfo, isLoggedIn } = useAuth();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showPromptModal, setShowPromptModal] = useState(false); 

  useEffect(() => {
    if (isLoggedIn && userInfo && userInfo.department?.departmentCode) {
      fetchAllStudentsFilterDepartment();
      fetchStudentsByInstructor(setStudents, setIsSubmitting, setIsSuccess, setErrorMessage, setIsError, userInfo.user.id);
    }
  }, [isLoggedIn, userInfo]);

  const fetchAllStudentsFilterDepartment = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/students`, {
        params: { departmentCode: userInfo.department.departmentCode },
      });
      setAllStudents(response.data);
    } catch (error) {
      setErrorMessage("Error fetching department students.");
      setIsError(true);
    }
  };

  const handleCheckboxChange = (student, isChecked) => {
    if (isChecked) {
      setSelectedStudents((prev) => [...prev, student]);
    } else {
      setSelectedStudents((prev) => prev.filter((s) => s.studentId !== student.studentId));
    }
  };

  const confirmAddStudent = () => {
    setShowPromptModal(true); 
  };

  const addStudent = async () => {
    try {
      const studentsToAdd = selectedStudents.map((student) => ({
        email: student.user.email,
        firstName: student.user.firstName,
        lastName: student.user.lastName,
        instructorId: userInfo.user.id, 
        studentId: student.studentId,
        degreeProgramId: student.degreeProgram.id,
      }));
  
      for (let student of studentsToAdd) {
        await axios.put(`${apiBaseUrl}/teachers/student`, student);
      }
  
      fetchStudentsByInstructor(setStudents, setIsSubmitting, setIsSuccess, setErrorMessage, setIsError, userInfo.user.id);
      setIsSuccess(true);
      setShowModal(false);
    } catch (error) {
      console.log(error)
      setErrorMessage("Error adding student.");
      setIsError(true);
    }
  };

  return (
    <>
      <InstructorDashboardView students={students} openModal={() => setShowModal(true)} />

      <PromptModal
        open={showPromptModal}
        centered
        onClose={() => setShowPromptModal(false)}
        onConfirm={() => {
          addStudent();
          setShowPromptModal(false); 
        }}
        message="Are you sure you want to add the selected students?"
      />

      <Modal
        title="Select Students"
        open={showModal}
        onOk={confirmAddStudent}
        width={1200}
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
        onCancel={() => setShowModal(false)}
        centered
      >
        <Table dataSource={allStudents} rowKey="studentId">
          <Table.Column
            title="Select"
            render={(student) => (
              <Checkbox onChange={(e) => handleCheckboxChange(student, e.target.checked)} />
            )}
          />
          <Table.Column
            title="Name"
            key="name"
            render={(student) => `${student.user.firstName} ${student.user.lastName}`}
          />
          <Table.Column
            title="Program"
            key="program"
            render={(student) => student.degreeProgram.programName}
          />
        </Table>
      </Modal>
      <LoadingModal open={isSubmitting} />
      <OkayModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        message="Fetched data successfully!"
      />
      <ErrorModal
        open={isError}
        onClose={() => setIsError(false)}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default InstructorDashboardController;
