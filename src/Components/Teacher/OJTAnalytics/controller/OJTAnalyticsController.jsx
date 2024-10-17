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
    const [isSubmitting, setIsSubmitting] = useState(true);
    const [studentsLogbookSentimentAvg, setStudentsLogbookSentimentAvg] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An error occurred");

    useEffect(() => {
        if (isLoggedIn) {
            fetchAllStudentsFilterDepartment();
        }
    }, [isLoggedIn]);

    const fetchAllStudentsFilterDepartment = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/students`, {
                params: { departmentCode: userInfo.department.departmentCode },
            });

            const students = response.data;
            const logbookSentiments = await fetchStudentsLogbookAndAnalyzeSentiment(students);

            setStudentsLogbookSentimentAvg(logbookSentiments);
            setIsSuccess(true);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchStudentsLogbookAndAnalyzeSentiment = async (students) => {
        let sentimentData = [];

        for (const student of students) {
            const { id: userId, firstName, lastName } = student.user;

            try {
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

                sentimentData.push({
                    userId: userId,
                    firstName: firstName,  
                    lastName: lastName,    
                    positive: sentimentCounts.positive,
                    negative: sentimentCounts.negative,
                    neutral: sentimentCounts.neutral
                });

            } catch (error) {
                setIsError(true);
            }
        }

        return sentimentData;
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
            setIsError(true);
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

    return (
        <div>
            {userInfo.user.userType === 'Teacher' && 
                <div>
                    {studentsLogbookSentimentAvg.length > 0 ? (
                        <OJTAnalyticsViewTeacher data={studentsLogbookSentimentAvg} />
                    ) : (
                        <Empty description="No data available" />
                    )}
                </div>
            }
            {userInfo.user.userType === 'Chair' && 
                <div>
                    <OJTAnalyticsViewDean />
                </div>
            }            

            <LoadingModal open={isSubmitting} />
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
