import { useEffect, useState } from "react";
import { useAuth } from "../../../Common/AuthContext";
import StudentMonitoringView from "../view/StudentMonitoringView";
import { fetchStudentsByInstructor } from "../../../Teacher/Common/Functions";
import axios from "axios"; 
import LoadingModal from "../../../Common/Modals/LoadingModal";
import OkayModal from "../../../Common/Modals/OkayModal";
import ErrorModal from "../../../Common/Modals/ErrorModal";
import { Carousel, Modal } from "antd";
import PromptModal from "../../../Common/Modals/PromptModal";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const StudentMonitoringController = () => {
    const [students, setStudents] = useState([]);
    const [studentPerformance, setStudentPerformance] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { isLoggedIn, userInfo } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [studentLogbooks, setStudentLogbooks] = useState([]);
    const { authUser } = useAuth();

    useEffect(() => {
        if (isLoggedIn && userInfo?.user?.id) {
            fetchStudentsByInstructor(
                async (fetchedStudents) => {
                    setStudents(fetchedStudents);
                    for (const student of fetchedStudents) {
                        await fetchStudentPerformance(student.user.id);
                        await handleFetchStudentLogbooks(student.user.id);
                    }
                },
                setIsSubmitting, 
                setIsSuccess, 
                setErrorMessage, 
                setIsError, 
                userInfo.user.id
            );
        }
    }, [isLoggedIn, userInfo]);

    const fetchStudentPerformance = async (id) => {
        try {
            const response = await axios.get(`${apiBaseUrl}/students/${id}/performance`);
            setStudentPerformance(prevPerformance => ({
                ...prevPerformance,
                [id]: response.data, 
            }));
        } catch (error) {
            const errorDetail = error.response?.data?.message || "Error fetching student performance.";
            setErrorMessage(errorDetail);
            setIsError(true);
        }
    };

    const handleFetchStudentLogbooks = async(id) => {
        try {
            const response = await axios.get(`${apiBaseUrl}/logbooks/student/${id}`, {
                headers: {
                  Authorization: `Bearer ${authUser.accessToken}`,
                },
            });
            setStudentLogbooks(prevLogbooks => ({
                ...prevLogbooks,
                [id]: response.data, 
            }));
        } catch (error) {
            const errorDetail = error.response?.data?.message || "Error fetching student logbook entries.";
            setErrorMessage(errorDetail);
            setIsError(true);
        }
    }

    const sanitizeDateString = (dateString) => {
        if (typeof dateString !== 'string') return ''; 
        return dateString.replace(/\s\+\d{2}:\d{2}$/, ''); 
    };

    const renderLogbookEntry = (logbook) => {
        const timeIn = logbook.attendance?.timeIn || null; 
        const timeOut = logbook.attendance?.timeOut || null; 

        const sanitizedTimeIn = sanitizeDateString(timeIn);
        const sanitizedTimeOut = sanitizeDateString(timeOut);

        return (
            <div key={logbook.id} className="logbook-entry">
                <form className="logbook-form">
                    <div className="form-group">
                        <label htmlFor="attendanceId">Attendance Date:</label>
                        <input
                            type="text"
                            name="attendanceId"
                            value={`${new Date(sanitizedTimeIn || Date.now()).toLocaleDateString()} (Time In: ${new Date(sanitizedTimeIn || Date.now()).toLocaleTimeString()})`}
                            disabled
                            className="disabled-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="activities">Activities:</label>
                        <textarea
                            className="large-textarea"
                            value={logbook.activities || ''} 
                            disabled
                        />
                    </div>
                </form>
            </div>
        );
    };
    
    return (
        <div>
            <StudentMonitoringView 
                students={students} 
                studentPerformance={studentPerformance} 
                handleFetchStudentLogbooks={() => setIsModalOpen(true)}
            />
            <LoadingModal open={isSubmitting} />
            <OkayModal
                open={isSuccess}
                onClose={() => setIsSuccess(false)}
                message="Fetched students data successfully!"
            />
            <ErrorModal
                open={isError}
                onClose={() => setIsError(false)}
                errorMessage={errorMessage}
            />
            <Modal 
                open={isModalOpen}
                centered
                bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                title="Student Logbook Entries"
            >
                {Object.keys(studentLogbooks).length === 0 || 
                Object.values(studentLogbooks).every(logbooks => logbooks.length === 0) ? (
                    <p style={{ textAlign: 'center', color: '#e74c3c', fontSize: 20 }}>No logbooks available for this student.</p>
                ) : (
                    <Carousel 
                        arrows 
                        draggable 
                    >
                        {Object.keys(studentLogbooks).map((studentId) => (
                            studentLogbooks[studentId].map((logbook) => (
                                logbook.attendance ? ( 
                                    <div key={logbook.id}>
                                        {renderLogbookEntry(logbook)}
                                    </div>
                                ) : null 
                            ))
                        ))}
                    </Carousel>
                )}
            </Modal>
        </div>        
    );
}

export default StudentMonitoringController;
