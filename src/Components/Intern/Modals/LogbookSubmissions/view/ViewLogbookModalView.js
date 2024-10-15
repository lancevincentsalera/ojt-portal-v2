import React from "react";
import { Modal, Input, Row, Col } from "antd";

const { TextArea } = Input;

const ViewLogbookModalView = ({ showModal, handleModalAction, selectedLogbook }) => {
  if (!selectedLogbook) return null;

  const creationDate = new Date(selectedLogbook.creationTimestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  const timeIn = new Date(selectedLogbook.attendance.timeIn).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const timeOut = new Date(selectedLogbook.attendance.timeOut).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const renderedHours = selectedLogbook.attendance.renderedHours;
  const isTimeInLate = selectedLogbook.attendance.isTimeInLate ? "Yes" : "No";
  const isTimeOutLate = selectedLogbook.attendance.isTimeOutLate ? "Yes" : "No";
  const logbookStatus = selectedLogbook.logbookStatus;

  return (
    <Modal
      title={`Logbook Details`}
      open={showModal}
      onCancel={handleModalAction}
      footer={null}
      bodyStyle={{ padding: "16px", maxHeight: "400px", overflowY: "auto" }} 
      style={{ top: 20 }}
      centered
    >
      <Row gutter={16} style={{ marginBottom: "16px" }}>
        <Col span={12}>
          <label>Date of Entry:</label>
          <Input value={creationDate} disabled />
        </Col>
        <Col span={12}>
          <label>Logbook Status:</label>
          <Input value={logbookStatus} disabled />
        </Col>
      </Row>

      <div style={{ marginBottom: "16px" }}>
        <label>Attendance Information:</label>
        <Input.TextArea
          value={`Time In: ${timeIn} (Late: ${isTimeInLate})\nTime Out: ${timeOut} (Late: ${isTimeOutLate})\nRendered Hours: ${renderedHours} hours`}
          disabled
          rows={3}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label>Activities:</label>
        <TextArea value={selectedLogbook.activities} disabled rows={4} />
      </div>

      <div>
        <label>Remarks:</label>
        <TextArea value={selectedLogbook.remarks || "No remarks provided."} disabled rows={3} />
      </div>
    </Modal>
  );
};

export default ViewLogbookModalView;
