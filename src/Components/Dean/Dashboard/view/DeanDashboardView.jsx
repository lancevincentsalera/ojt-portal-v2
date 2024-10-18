import { useAuth } from "../../../Common/AuthContext";
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; 
import { Col, Row, Statistic } from "antd";
import {
    ClockCircleOutlined,
    TeamOutlined,
    CheckOutlined,
    CloseOutlined,
  } from '@ant-design/icons';

const DeanDashboardView = ({ allStudents }) => {
    const { userInfo } = useAuth();
    console.log(userInfo)
    const studentProgramData = allStudents.reduce((acc, student) => {
        const program = student.degreeProgram.programName;
        acc[program] = acc[program] ? acc[program] + 1 : 1;
        return acc;
    }, {});

    const internshipStatusData = allStudents.reduce((acc, student) => {
        const status = student.internshipStatus;
        acc[status] = acc[status] ? acc[status] + 1 : 1;
        return acc;
    }, {});

    const barChartOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,  
            }
        }
    };

    const programChartData = {
        labels: Object.keys(studentProgramData),
        datasets: [{
            data: Object.values(studentProgramData),
            backgroundColor: ['#4caf50', '#ff6b6b', '#bdc3c7', '#e74c3c'],
        }]
    };

    const statusChartData = {
        labels: Object.keys(internshipStatusData),
        datasets: [{
            label: 'Internship Status',
            data: Object.values(internshipStatusData),
            backgroundColor: ['#4caf50', '#ff6b6b', '#e74c3c', '#94a3b8'],
        }]
    };

    return (
        <div>
            <div className="dashboard">
                <p className="heading">Teacher Details</p>
                <div className="dashboard-container details">
                    <div className="dashboard-group">
                        <p className="dashboard-heading" style={{ color: '#4caf50' }}>First Name</p>
                        <p className="detail"> {userInfo?.user?.firstName || "N/A"} </p>
                    </div>
                    <div className="dashboard-group">
                        <p className="dashboard-heading" style={{ color: '#4caf50' }}>Last Name</p>
                        <p className="detail"> {userInfo?.user?.lastName || "N/A"} </p>
                    </div>
                    <div className="dashboard-group">
                        <p className="dashboard-heading" style={{ color: '#4caf50' }}>Email</p>
                        <p className="detail">{userInfo?.user?.email || "N/A"}</p>
                    </div>
                    <div className="dashboard-group">
                        <p className="dashboard-heading" style={{ color: '#4caf50' }}>Department</p>
                        <p className="detail">{userInfo?.department?.departmentName || "N/A"}</p>
                    </div>
                    <div className="dashboard-group">
                        <p className="dashboard-heading" style={{ color: '#4caf50' }}>Designation</p>
                        <p className="detail">{userInfo?.designation || "N/A"}</p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p className="heading text-base font-bold">Students Summary</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <Row gutter={[16, 16]} justify="start">
                        <Col span={6}>
                            <Statistic
                                title="Total Teachers"
                                value={userInfo.teacherCount}
                                prefix={<TeamOutlined />}
                            />
                        </Col>
                        <Col span={6}>
                            <Statistic
                                title="Total Students"
                                value={userInfo.studentCount}
                                prefix={<TeamOutlined />}
                            />
                        </Col>
                    </Row>
                </div>

                <div className="dashboard" >
                    <p className="heading">Student Data Overview</p>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <div style={{ width: '50%', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ fontSize: 20, textAlign: 'center' }}>
                        Students per Program
                    </p>
                    <Bar data={programChartData} options={barChartOptions} />
                </div>
                <div style={{ width: '40%', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ fontSize: 20, textAlign: 'center' }}>
                        Internship Status Distribution
                    </p>
                    <Pie data={statusChartData} options={{ maintainAspectRatio: false }} />
                </div>
    </div>
</div>

            </div>
        </div>
    );
}

export default DeanDashboardView;
