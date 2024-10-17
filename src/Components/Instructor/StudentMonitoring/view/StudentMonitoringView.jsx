import React, { useState } from 'react';
import { Collapse, Empty } from 'antd';

const { Panel } = Collapse;

const StudentMonitoringView = ({ students }) => {
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
            {students.map((student, index) => (
                <Panel
                    key={index}
                    header={
                      <div style={{ fontSize: '18px', fontWeight: 'bold'}}>
                            {`${student.user.firstName} ${student.user.lastName}`}
                      </div>
                    }
                    style={{ backgroundColor: '#f8fafc', borderRadius: '8px' }}
                >
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(11, 1fr)', // Adjusted to fit everything in one row
                    }}>
                        {/* Headers */}
                        <div style={{ color: '#4caf50', fontWeight: 'bold', border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>Email</div>
                        <div style={{ color: '#4caf50', fontWeight: 'bold', border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>Degree Program</div>
                        <div style={{ color: '#4caf50', fontWeight: 'bold', border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>Internship Status</div>
                        <div style={{ color: '#4caf50', fontWeight: 'bold', border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>Start Date</div>
                        <div style={{ color: '#4caf50', fontWeight: 'bold', border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>End Date</div>
                        <div style={{ color: '#4caf50', fontWeight: 'bold', border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>Shift</div>
                        <div style={{ color: '#4caf50', fontWeight: 'bold', border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>Working Days</div>
                        <div style={{ color: '#4caf50', fontWeight: 'bold', border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>Total Hours Rendered</div>
                        <div style={{ color: '#4caf50', fontWeight: 'bold', border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>Absences</div>
                        <div style={{ color: '#ff6b6b', fontWeight: 'bold', border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>Late Time Ins</div>
                        <div style={{ color: '#ff6b6b', fontWeight: 'bold', border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>Late Time Outs</div>
                        
                        {/* Student Data */}
                        <div style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>{student.user.email}</div>
                        <div style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>{student.degreeProgram.programName} ({student.degreeProgram.programAlias})</div>
                        <div style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>{student.internshipStatus}</div>
                        <div style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>{student.startDate}</div>
                        <div style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>{student.endDate}</div>
                        <div style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>{student.shift.start} - {student.shift.end}</div>
                        <div style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>{student.shift.workingDays}</div>
                        <div style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>{student.shift.totalHrsRendered} hrs</div>
                        <div style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>{student.shift.absencesCount}</div>
                        <div style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>{student.shift.lateTimeInCount}</div>
                        <div style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '12px' }}>{student.shift.lateTimeOutCount}</div>
                    </div>
                </Panel>
            ))}
        </Collapse>
    );
};

export default StudentMonitoringView;
