import { useEffect, useState } from "react";
import { useAuth } from "../../../Common/AuthContext";
import StudentMonitoringView from "../view/StudentMonitoringView";
import { fetchStudentsByInstructor } from "../../../Teacher/Common/Functions";
import axios from "axios"; 
import LoadingModal from "../../../Common/Modals/LoadingModal";
import OkayModal from "../../../Common/Modals/OkayModal";
import ErrorModal from "../../../Common/Modals/ErrorModal";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const StudentMonitoringController = () => {
    const [students, setStudents] = useState([]);
    const [studentPerformance, setStudentPerformance] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { isLoggedIn, userInfo } = useAuth();

    useEffect(() => {
        if (isLoggedIn && userInfo?.user?.id) {
            fetchStudentsByInstructor(
                async (fetchedStudents) => {
                    setStudents(fetchedStudents);
                    for (const student of fetchedStudents) {
                        await fetchStudentPerformance(student.user.id);
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
    
    return (
        <div>
            <StudentMonitoringView 
                students={students} 
                studentPerformance={studentPerformance} 
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
        </div>        
    );
}

export default StudentMonitoringController;
