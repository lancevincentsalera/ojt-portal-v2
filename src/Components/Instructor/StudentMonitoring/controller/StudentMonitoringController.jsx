import { useEffect, useState } from "react";
import { useAuth } from "../../../Common/AuthContext";
import StudentMonitoringView from "../view/StudentMonitoringView";
import { fetchStudentsByInstructor } from "../../../Teacher/Common/Functions";
import LoadingModal from "../../../Common/Modals/LoadingModal";
import OkayModal from "../../../Common/Modals/OkayModal";
import ErrorModal from "../../../Common/Modals/ErrorModal";

const StudentMonitoringController = () => {
    const [students, setStudents] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { isLoggedIn, userInfo } = useAuth();

    useEffect(() => {
        fetchStudentsByInstructor(setStudents, setIsSubmitting, setIsSuccess, setErrorMessage, setIsError, userInfo.user.id);
    }, [isLoggedIn]);
    
    return (
        <div>
            <StudentMonitoringView students={students}/>
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

export default StudentMonitoringController