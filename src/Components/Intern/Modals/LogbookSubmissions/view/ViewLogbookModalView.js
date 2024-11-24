import React from "react";
import { Modal, Input, Row, Col } from "antd";

const { TextArea } = Input;

const ViewLogbookModalView = ({
  showModal,
  handleModalAction,
  selectedLogbook,
}) => {
  if (!selectedLogbook) return null;

  const creationDate = new Date(
    selectedLogbook.creationTimestamp.replace(/ \+\d{2}:\d{2}$/, "")
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const timeIn = new Date(
    selectedLogbook.attendance.timeIn.replace(/ \+\d{2}:\d{2}$/, "")
  ).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const timeOut = selectedLogbook.attendance.timeOut
    ? new Date(
        selectedLogbook.attendance.timeOut.replace(/ \+\d{2}:\d{2}$/, "")
      ).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";
  const renderedHours = selectedLogbook.attendance.renderedHours;
  const isTimeInLate = selectedLogbook.attendance.isTimeInLate ? "Yes" : "No";
  const isTimeOutLate = selectedLogbook.attendance.isTimeOutLate ? "Yes" : "No";
  const logbookStatus = selectedLogbook.logbookStatus;

  const sentimentCategory =
    selectedLogbook.remarkSentimentCategory || "No sentiment can be made.";
  const sentimentScore =
    selectedLogbook.remarkSentimentScore !== null
      ? selectedLogbook.remarkSentimentScore
      : "N/A";

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
        <TextArea
          value={`Time In: ${timeIn} (Late: ${isTimeInLate})\nTime Out: ${timeOut} (Late: ${isTimeOutLate})\nRendered Hours: ${renderedHours} hours`}
          disabled
          rows={3}
          style={{
            resize: "none",
            width: "100%",
            padding: "8px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
          }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label>Activities:</label>
        <TextArea
          value={selectedLogbook.activities}
          disabled
          rows={4}
          style={{
            resize: "none",
            width: "100%",
            padding: "8px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
          }}
        />
      </div>

      <div style={{ marginTop: "16px" }}>
        <label>Remarks:</label>
        <TextArea
          value={selectedLogbook.remarks || "No remarks provided."}
          disabled
          rows={3}
          style={{
            resize: "none",
            width: "100%",
            padding: "8px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
          }}
        />
      </div>

      <div style={{ marginTop: "16px" }}>
        <label>Sentimental Analysis Result: </label>
        <p style={{ fontSize: "15px", color: "#ff6b6b" }}>
          <h6>{sentimentCategory}</h6>
        </p>
      </div>
    </Modal>
  );
};

export default ViewLogbookModalView;
