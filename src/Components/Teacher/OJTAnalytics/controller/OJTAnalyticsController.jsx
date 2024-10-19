import axios from "axios";
import { useAuth } from "../../../Common/AuthContext";
import ErrorModal from "../../../Common/Modals/ErrorModal";
import LoadingModal from "../../../Common/Modals/LoadingModal";
import OkayModal from "../../../Common/Modals/OkayModal";
import { useEffect, useState } from "react";
import { Empty } from "antd"; 
import OJTAnalyticsViewTeacher from "../view/OJTAnalyticsViewTeacher";
import OJTAnalyticsViewDean from "../view/OJTAnalyticsViewDean";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const OJTAnalyticsController = () => {
    const { userInfo, isLoggedIn } = useAuth();
    const [pendingRequests, setPendingRequests] = useState(0); 
    const [studentsLogbookSentimentAvg, setStudentsLogbookSentimentAvg] = useState([]); 
    const [isSuccess, setIsSuccess] = useState(false); 
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An error occurred"); 
    const [degreePrograms, setDegreePrograms] = useState([]);
    const [teacherStudentsSentimentAvg, setTeacherStudentsSentimentAvg] = useState([]); 

    useEffect(() => {
        if (isLoggedIn && userInfo.user.userType === "Chair") {
            fetchDegreePrograms();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (degreePrograms.length > 0 && userInfo.user.userType === "Chair") {
            fetchAllStudentsFilterDepartment();
        }
    }, [degreePrograms]);

    useEffect(() => {
        if (isLoggedIn && userInfo.user.userType === "Teacher") {
            fetchStudentsUnderTeacher();
        }
    }, [isLoggedIn]);

    const fetchDegreePrograms = async () => {
        try {
            setPendingRequests(prev => prev + 1); 
            const response = await axios.get(`${apiBaseUrl}/degree-programs/department/${userInfo.department.departmentId}`);
            console.log("Degree Programs:", response.data); 
            setDegreePrograms(response.data);
            setIsError(false);
        } catch (error) {
            console.error(error);
            setIsError(true);
            setErrorMessage("Failed to fetch degree programs");
        } finally {
            setPendingRequests(prev => prev - 1); 
        }
    };

    const fetchAllStudentsFilterDepartment = async () => {
        try {
            setPendingRequests(prev => prev + 1); 
            const response = await axios.get(`${apiBaseUrl}/students`, {
                params: { departmentCode: userInfo.department.departmentCode },
            });
            console.log("Students:", response.data);

            const students = response.data;
            const logbookSentiments = await fetchStudentsLogbookAndAnalyzeSentiment(students);

            setStudentsLogbookSentimentAvg(logbookSentiments);
            setIsSuccess(true);
            setIsError(false); 
        } catch (error) {
            console.error(error);
            setIsError(true);
            setErrorMessage("Failed to fetch students for department");
        } finally {
            setPendingRequests(prev => prev - 1); 
        }
    };

    const fetchStudentsUnderTeacher = async () => {
        try {
            setPendingRequests(prev => prev + 1); 
            const response = await axios.get(`${apiBaseUrl}/teachers/${userInfo.user.id}/students`);
            console.log("Teacher's Students:", response.data); 

            const students = response.data.students;

            if (!Array.isArray(students)) {
                throw new Error("Students data is not in the expected format.");
            }

            const logbookSentiments = await fetchStudentsLogbookAndAnalyzeSentiment(students);
            setTeacherStudentsSentimentAvg(logbookSentiments);
            setIsSuccess(true);
            setIsError(false); 
        } catch (error) {
            console.error(error);
            setIsError(true);
            setErrorMessage("Failed to fetch students under teacher");
        } finally {
            setPendingRequests(prev => prev - 1); 
        }
    };

    const fetchStudentsLogbookAndAnalyzeSentiment = async (students) => {
        // Check user type to aggregate sentiment accordingly
        const sentimentData = userInfo.user.userType === "Chair" ? {} : [];
    
        for (const student of students) {
            const { id: userId, firstName, lastName } = student.user;
            const degreeProgramId = student.degreeProgram.id;
    
            try {
                setPendingRequests(prev => prev + 1);
                const logbookResponse = await axios.get(`${apiBaseUrl}/logbooks/student/${userId}`);
                const logbooks = logbookResponse.data;
    
                let sentimentCounts = {
                    positive: 0,
                    negative: 0,
                    neutral: 0
                };
    
                for (const logbook of logbooks) {
                    const { activities, remarks } = logbook;
    
                    if (activities && activities.trim() !== "") {
                        const sentimentResponse = await analyzeSentiment(activities);
                        updateSentimentCounts(sentimentCounts, sentimentResponse);
                    }
    
                    if (remarks && remarks.trim() !== "") {
                        const sentimentResponse = await analyzeSentiment(remarks);
                        updateSentimentCounts(sentimentCounts, sentimentResponse);
                    }
                }
    
                if (userInfo.user.userType === "Chair") {
                    // Aggregate by program for Chair
                    if (!sentimentData[degreeProgramId]) {
                        sentimentData[degreeProgramId] = {
                            programName: getProgramNameById(degreeProgramId),
                            positive: 0,
                            negative: 0,
                            neutral: 0,
                            studentCount: 0
                        };
                    }
    
                    sentimentData[degreeProgramId].positive += sentimentCounts.positive;
                    sentimentData[degreeProgramId].negative += sentimentCounts.negative;
                    sentimentData[degreeProgramId].neutral += sentimentCounts.neutral;
                    sentimentData[degreeProgramId].studentCount += 1;
    
                } else if (userInfo.user.userType === "Teacher") {
                    // Aggregate by student for Teacher
                    sentimentData.push({
                        userId,
                        firstName,
                        lastName,
                        positive: sentimentCounts.positive,
                        negative: sentimentCounts.negative,
                        neutral: sentimentCounts.neutral,
                    });
                }
    
            } catch (error) {
                console.error(error);
                setIsError(true);
                setErrorMessage("Error processing logbook sentiment analysis");
            } finally {
                setPendingRequests(prev => prev - 1);
            }
        }
    
        console.log("Sentiment Data:", sentimentData);
    
        return userInfo.user.userType === "Chair" ? Object.values(sentimentData) : sentimentData;
    };
    

    const analyzeSentiment = async (text) => {
        try {
            const sentimentResponse = await axios.post(`${apiBaseUrl}/sentiment/analysis`, JSON.stringify(text), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return sentimentResponse.data;
        } catch (error) {
            console.error(error);
            setIsError(true);
            setErrorMessage("Failed to analyze sentiment");
        }
    };

    const updateSentimentCounts = (counts, sentimentResponse) => {
        const { label } = sentimentResponse;

        if (label === "positive") {
            counts.positive += 1;
        } else if (label === "negative") {
            counts.negative += 1;
        } else {
            counts.neutral += 1;
        }
    };

    const getProgramNameById = (degreeProgramId) => {
        const program = degreePrograms.find(p => p.id === degreeProgramId);
        return program ? program.programName : "Unknown Program";
    };

    return (
        <div>
            {userInfo.user.userType === 'Chair' && 
                <div>
                    {studentsLogbookSentimentAvg.length > 0 ? (
                        <OJTAnalyticsViewDean data={studentsLogbookSentimentAvg} />
                    ) : (
                        <Empty description="No data available" />
                    )}
                </div>
            }

            {userInfo.user.userType === 'Teacher' && 
                <div>
                    {teacherStudentsSentimentAvg.length > 0 ? (
                        <OJTAnalyticsViewTeacher data={teacherStudentsSentimentAvg} />
                    ) : (
                        <Empty description="No data available" />
                    )}
                </div>
            }            

            <LoadingModal open={pendingRequests > 0} /> 
            <OkayModal
                open={isSuccess}
                onClose={() => setIsSuccess(false)}
                message="Data fetched successfully!"
            />
            <ErrorModal
                open={isError}
                onClose={() => setIsError(false)}
                errorMessage={errorMessage}
            />
        </div>
    );
};

export default OJTAnalyticsController;
