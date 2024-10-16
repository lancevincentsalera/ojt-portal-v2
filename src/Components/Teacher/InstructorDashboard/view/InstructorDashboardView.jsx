import { useAuth } from "../../../Common/AuthContext";
import { Row, Col, Card, Statistic } from 'antd';
import {
  BarChartOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const InstructorDashboardView = () => {
    const { userInfo } = useAuth();
    const studentData = userInfo?.students || [];

    // Prepare data for charts
    const totalHoursData = {
        labels: studentData.map(student => student.user.firstName + ' ' + student.user.lastName),
        datasets: [
            {
                label: 'Total Hours Rendered',
                data: studentData.map(student => student.shift.totalHrsRendered),
                backgroundColor: '#4caf50',
            },
        ],
    };

    const absencesAndLateData = {
        labels: ['Late Time In', 'Late Time Out', 'Absences'],
        datasets: [
            {
                label: 'Attendance Overview',
                data: [
                    studentData.reduce((acc, student) => acc + student.shift.lateTimeInCount, 0),
                    studentData.reduce((acc, student) => acc + student.shift.lateTimeOutCount, 0),
                    studentData.reduce((acc, student) => acc + student.shift.absencesCount, 0),
                ],
                backgroundColor: [
                    '#ff6b6b',
                    '#ff9e9e',
                    '#e74c3c'
                ],
            },
        ],
    };

    const mentorAssignedData = {
        labels: ['With Mentor', 'Without Mentor'],
        datasets: [
            {
                label: 'Mentorship Assignment',
                data: [
                    studentData.filter(student => student.mentor !== null).length,
                    studentData.filter(student => student.mentor === null).length,
                ],
                backgroundColor: [
                    '#4caf50',
                    '#e74c3c'
                ],
            },
        ],
    };

    return (
        <div className="dashboard p-5">
            <div className="dashboard">
                <p className="heading">Teacher Details</p>
                <div className="dashboard-container details">
                    <div className="dashboard-group">
                        <p className="dashboard-heading">First Name</p>
                        <p className="detail"> {userInfo?.user?.firstName || "N/A"} </p>
                    </div>
                    <div className="dashboard-group">
                        <p className="dashboard-heading">Last Name</p>
                        <p className="detail"> {userInfo?.user?.lastName || "N/A"} </p>
                    </div>
                    <div className="dashboard-group">
                        <p className="dashboard-heading">Email</p>
                        <p className="detail">{userInfo?.user?.email || "N/A"}</p>
                    </div>
                    <div className="dashboard-group">
                        <p className="dashboard-heading">Account Status</p>
                        <p className="detail">{userInfo?.user?.accountStatus || "N/A"}</p>
                    </div>
                    <div className="dashboard-group">
                        <p className="dashboard-heading">Department</p>
                        <p className="detail">{userInfo?.department?.departmentName || "N/A"}</p>
                    </div>
                    <div className="dashboard-group">
                        <p className="dashboard-heading">Designation</p>
                        <p className="detail">{userInfo?.designation || "N/A"}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-md mb-8">
                <p className="heading text-2xl font-bold mb-4">Students Summary</p>
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <Statistic
                            title="Total Students"
                            value={userInfo?.studentCount || 0}
                            prefix={<TeamOutlined />}
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            title="Ongoing Internships"
                            value={studentData.filter(student => student?.internshipStatus === 'Ongoing').length}
                            prefix={<ClockCircleOutlined />}
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            title="Pending Internships"
                            value={studentData.filter(student => student?.internshipStatus === 'Pending').length}
                            prefix={<ClockCircleOutlined />}
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            title="Students Without Mentor"
                            value={studentData.filter(student => student.mentor === null).length}
                            prefix={<CloseOutlined />}
                        />
                    </Col>
                </Row>
            </div>

            <p className="heading text-2xl font-bold mb-4">Performance Overview</p>
            <div className="bg-white p-5 rounded-lg shadow-md">
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Card title={<span style={{ fontSize: '0.875rem' }}>Total Hours Rendered</span>} bordered={false} className="h-full">
                            <div className="h-50">
                                <Bar data={totalHoursData} />
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title={<span style={{ fontSize: '0.875rem' }}>Absences and Late Counts</span>} bordered={false} className="h-full">
                            <div className="h-50">
                                <Pie data={absencesAndLateData} />
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title={<span style={{ fontSize: '0.875rem' }}>Mentorship Assignment</span>} bordered={false} className="h-full">
                            <div className="h-50">
                                <Pie data={mentorAssignedData} />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default InstructorDashboardView;
