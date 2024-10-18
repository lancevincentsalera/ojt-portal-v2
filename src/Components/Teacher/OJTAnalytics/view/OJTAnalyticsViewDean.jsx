import { Pie } from 'react-chartjs-2';
import { Empty, Row, Col, Card } from "antd";
import 'chart.js/auto';  

const OJTAnalyticsViewDean = ({ data }) => {
    console.log(data)
    const renderDegreeProgramData = (program) => {
        const { programName, positive, negative, neutral, studentCount } = program;

        const sentimentData = {
            labels: ['Positive', 'Negative', 'Neutral'],
            datasets: [
                {
                    label: `Sentiment Analysis (${studentCount} students)`,
                    data: [positive, negative, neutral],
                    backgroundColor: ['#4caf50', '#ff6b6b', '#bdc3c7'],
                }
            ]
        };

        return (
            <Col span={8} key={programName}>  
                <Card 
                    title={<span style={{ fontSize: 18 }}>{programName}</span>} 
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
            <p style={{fontWeight: 'bold', fontSize: '20', marginBottom: 15}}>Sentimental Analysis by Degree Program</p>
            {data && data.length > 0 ? (
                <Row gutter={[16, 16]}>  
                    {data.map(program => renderDegreeProgramData(program))}
                </Row>
            ) : (
                <Empty description="No data available" />
            )}
        </div>
    );
};

export default OJTAnalyticsViewDean;
