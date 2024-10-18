import { Pie } from 'react-chartjs-2';
import { Empty, Row, Col, Card } from "antd";
import 'chart.js/auto';  

const OJTAnalyticsViewTeacher = ({data}) => {
    console.log(data);

    const allSentimentsZero = data.every(student => 
        student.positive === 0 && student.negative === 0 && student.neutral === 0
    );

    const renderStudentData = (student) => {
        const { userId, firstName, lastName, positive, negative, neutral } = student;

        const sentimentData = {
            labels: ['Positive', 'Negative', 'Neutral'],
            datasets: [
                {
                    label: 'Sentiment Analysis',
                    data: [positive, negative, neutral],
                    backgroundColor: ['#4caf50', '#ff6b6b', '#bdc3c7'],
                }
            ]
        };

        return (
            <Col span={8} key={userId}>  
                <Card 
                    title={<span style={{ fontSize: 18 }}>{firstName} {lastName}</span>} 
                    bordered={false}
                >
                    <div className="flex justify-center items-center" style={{ height: '200px' }}>  
                        <Pie data={sentimentData} options={{ maintainAspectRatio: false }} />  
                    </div>
                </Card>
            </Col>
        );
    };

    return (
        <div>
            <p style={{fontWeight: 'bold', fontSize: '20'}}>Sentimental Analysis Result</p>
            {data && data.length > 0 && !allSentimentsZero ? (
                <Row gutter={[16, 16]}>  
                    {data
                        .filter(student => student.positive > 0 || student.negative > 0 || student.neutral > 0)  
                        .map(student => renderStudentData(student))
                    }
                </Row>
            ) : (
                <Empty description="No data available" />
            )}
        </div>
    );
};

export default OJTAnalyticsViewTeacher;
