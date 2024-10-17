import { Row, Col, Card, Statistic, Button } from 'antd';
import { Pie } from 'react-chartjs-2';
import {
  ClockCircleOutlined,
  TeamOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../../Common/AuthContext';
import 'chart.js/auto';

const InstructorDashboardView = ({ students = [], openModal }) => {
  const studentCount = Array.isArray(students) ? students.length : 0;
  const { userInfo } = useAuth();

  const totalHoursRendered = studentCount > 0
    ? students.reduce((acc, student) => acc + (student.shift?.totalHrsRendered || 0), 0)
    : 0;
  const avgHoursRendered = studentCount > 0
    ? (totalHoursRendered / studentCount).toFixed(2)
    : 0;

  const totalLateTimeIn = studentCount > 0
    ? students.reduce((acc, student) => acc + (student.shift?.lateTimeInCount || 0), 0)
    : 0;
  const totalLateTimeOut = studentCount > 0
    ? students.reduce((acc, student) => acc + (student.shift?.lateTimeOutCount || 0), 0)
    : 0;
  const totalAbsences = studentCount > 0
    ? students.reduce((acc, student) => acc + (student.shift?.absencesCount || 0), 0)
    : 0;

  const ongoingInternships = studentCount > 0
    ? students.filter(student => student.internshipStatus === 'Ongoing').length
    : 0;
  const pendingInternships = studentCount > 0
    ? students.filter(student => student.internshipStatus === 'Pending').length
    : 0;
  const withoutMentor = studentCount > 0
    ? students.filter(student => !student.mentor).length
    : 0;

  const absencesAndLateData = {
    labels: ['Late Time In', 'Late Time Out', 'Absences'],
    datasets: [
      {
        label: 'Attendance Overview',
        data: [totalLateTimeIn, totalLateTimeOut, totalAbsences],
        backgroundColor: ['#ff6b6b', '#ff9e9e', '#e74c3c'],
      },
    ],
  };

  const mentorAssignedData = {
    labels: ['With Mentor', 'Without Mentor'],
    datasets: [
      {
        label: 'Mentorship Assignment',
        data: [studentCount - withoutMentor, withoutMentor],
        backgroundColor: ['#4caf50', '#e74c3c'],
      },
    ],
  };

  return (
    <div>
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
            <p className="dashboard-heading">Department</p>
            <p className="detail">{userInfo?.department?.departmentName || "N/A"}</p>
          </div>
          <div className="dashboard-group">
            <p className="dashboard-heading">Designation</p>
            <p className="detail">{userInfo?.designation || "N/A"}</p>
          </div>
        </div>
      </div>

      {studentCount > 0 ? (
        <>
          <div className="bg-white p-5 rounded-lg shadow-md mb-3">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p className="heading text-2xl font-bold mb-4">Students Summary</p>
              <button onClick={openModal} className='text-xs bg-[#ff6b6b] p-1 rounded-md mb-3'>
                Add Student
              </button>
            </div>
            <Row gutter={[32, 32]} justify="space-between">
              <Col span={4}>
                <Statistic
                  title="Total Students"
                  value={studentCount}
                  prefix={<TeamOutlined />}
                />
              </Col>
              <Col span={4}>
                <Statistic
                  title="Ongoing Internships"
                  value={ongoingInternships}
                  prefix={<ClockCircleOutlined />}
                />
              </Col>
              <Col span={4}>
                <Statistic
                  title="Pending Internships"
                  value={pendingInternships}
                  prefix={<ClockCircleOutlined />}
                />
              </Col>
              <Col span={4}>
                <Statistic
                  title="Students Without Mentor"
                  value={withoutMentor}
                  prefix={<CloseOutlined />}
                />
              </Col>
              <Col span={4}>
                <Statistic
                  title="Average Hours Rendered"
                  value={avgHoursRendered}
                  precision={2}
                  prefix={<CheckOutlined />}
                />
              </Col>
            </Row>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <p className="heading text-xs font-bold">Performance Overview</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md">
            <Row gutter={[32, 32]} justify="space-between">
              <Col span={12}>
                <Card title={<span style={{ fontSize: '0.875rem' }}>Absences and Late Counts</span>} bordered={false} className="h-full">
                  <div className="flex justify-center items-center" style={{ height: '300px' }}>
                    <Pie data={absencesAndLateData} />
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card title={<span style={{ fontSize: '0.875rem' }}>Mentorship Assignment</span>} bordered={false} className="h-full">
                  <div className="flex justify-center items-center" style={{ height: '300px' }}>
                    <Pie data={mentorAssignedData} />
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p className="heading text-base font-bold mb-4">No Students Assigned</p>
            <Button onClick={openModal} className='text-xs bg-[#ff6b6b] p-1 rounded-md mb-3'>
              Add Student
            </Button>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md mb-8" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', textAlign: 'center' }}>
            <p style={{ fontSize: 20 }}>You currently do not have any students assigned for OJT supervision.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboardView;
