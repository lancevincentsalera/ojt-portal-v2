import { useEffect, useState } from "react";
import { useAuth } from "../../../Common/AuthContext";
import axios from "axios";
import LoadingModal from "../../../Common/Modals/LoadingModal";
import OkayModal from "../../../Common/Modals/OkayModal";
import ErrorModal from "../../../Common/Modals/ErrorModal";
import DeanDashboardView from "../view/DeanDashboardView";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const DeanDashboardController = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [allStudents, setAllStudents] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const {userInfo, isLoggedIn} = useAuth();

    useEffect(() => {
        fetchAllStudentsFilterDepartment();
    }, [isLoggedIn])

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

    return (
        <div>
            <DeanDashboardView allStudents={allStudents}/>
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
        </div>
    );
}

export default DeanDashboardController;