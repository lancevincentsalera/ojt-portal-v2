import React, { useState } from 'react';
import { Collapse, Empty } from 'antd';

const { Panel } = Collapse;

const StudentMonitoringView = ({ students, studentPerformance, handleFetchStudentLogbooks }) => {
  const [activeKey, setActiveKey] = useState(['0']);

  const handleCollapseChange = (key) => {
    setActiveKey(key);
  };

  if (!students || students.length === 0) {
    return <Empty description="No Students Available" />;
  }

  return (
    <Collapse 
      accordion
      activeKey={activeKey}
      onChange={handleCollapseChange}
    >
      {students.map((student, index) => {
        const performance = studentPerformance[student.user.id];

        return (
          <Panel
            key={index}
            header={
              <div style={{ fontSize: '18px', fontWeight: 'bold'}}>
                {`${student.user.firstName} ${student.user.lastName}`}
              </div>
            }
            style={{ backgroundColor: '#f8fafc', borderRadius: '8px' }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}>Student Details</div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)', 
            }}>
              <div style={cellHeaderStyle}>Email</div>
              <div style={cellHeaderStyle}>Degree Program</div>
              <div style={cellHeaderStyle}>Internship Status</div>
              <div style={cellHeaderStyle}>Start Date</div>
              <div style={cellHeaderStyle}>End Date</div>
              <div style={cellHeaderStyle}>Shift</div>
              <div style={cellHeaderStyle}>Working Days</div>

              <div style={cellDataStyle}>{student.user.email}</div>
              <div style={cellDataStyle}>{student.degreeProgram.programName} ({student.degreeProgram.programAlias})</div>
              <div style={cellDataStyle}>{student.internshipStatus}</div>
              <div style={cellDataStyle}>{student.startDate || 'N/A'}</div>
              <div style={cellDataStyle}>{student.endDate || 'N/A'}</div>
              <div style={cellDataStyle}>{student.shift.start || 'N/A'} - {student.shift.end || 'N/A'}</div>
              <div style={cellDataStyle}>{student.shift.workingDays}</div>
            </div>

            {performance && (
              <div style={{ marginTop: '16px', borderTop: '1px solid #e0e0e0', paddingTop: '16px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}>Performance Overview</div>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(5, 1fr)', 
                }}>
                  <div style={cellHeaderStyle}>Performance Status</div>
                  <div style={cellHeaderStyle}>Status Remarks</div>
                  <div style={cellHeaderStyle}>Attendance Count</div>
                  <div style={cellHeaderStyle}>Logbook Count</div>
                  <div style={cellHeaderStyle}>Remaining Hours to Render</div>

                  <div style={cellDataStyle}>{performance.performanceStatus}</div>
                  <div style={cellDataStyle}>{performance.statusRemarks}</div>
                  <div style={cellDataStyle}>{performance.attendanceCount}</div>
                  <div style={cellDataStyle}>{performance.logbookCount}</div>
                  <div style={cellDataStyle}>{performance.remainingHoursToRender}</div>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(5, 1fr)', 
                  marginTop: '16px'
                }}>
                  <div style={cellHeaderStyle}>Remaining Man Days</div>
                  <div style={cellHeaderStyle}>Late Time Ins</div>
                  <div style={cellHeaderStyle}>Late Time Outs</div>
                  <div style={cellHeaderStyle}>Total Hours Rendered</div>
                  <div style={cellHeaderStyle}>Absences</div>

                  <div style={cellDataStyle}>{performance.remainingManDays}</div>
                  <div style={cellDataStyle}>{student.shift.lateTimeInCount}</div>
                  <div style={cellDataStyle}>{student.shift.lateTimeOutCount}</div>
                  <div style={cellDataStyle}>{student.shift.totalHrsRendered} hrs</div>
                  <div style={cellDataStyle}>{student.shift.absencesCount}</div>
                </div>
              </div>
            )}
          </Panel>
        );
      })}
    </Collapse>
  );
};

const cellHeaderStyle = {
  color: '#ff6b6b',
  fontWeight: 'bold',
  border: '1px solid #e0e0e0',
  padding: '8px',
  fontSize: '12px',
};

const cellDataStyle = {
  border: '1px solid #e0e0e0',
  padding: '8px',
  fontSize: '12px',
};

export default StudentMonitoringView;
