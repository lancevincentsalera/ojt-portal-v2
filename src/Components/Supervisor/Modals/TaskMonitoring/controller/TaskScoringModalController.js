import React, { useState } from "react";
import TaskScoringModalView from "../view/TaskScoringModalView";
import axios from "axios";

const TaskScoringModalController = ({
  showModal,
  handleModalAction,
  task,
  internId,
}) => {
  const [score, setScore] = useState(0);

  const handleScoreChange = (e) => {
    const id = parseFloat(e.target.value);
    setScore(id);
  };

  const handleScoreAction = async () => {
    try {
      const url =
        process.env.REACT_APP_API_BASE_URL +
        `/tasks/${task.trainingTask.id}/user/${internId}/score`;
      console.log(url, score, "=================================");
      const response = await axios.patch(url, { params: { score: score } });
      console.log(response);
      alert("Score updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update score");
    }
  };

  return (
    <TaskScoringModalView
      showModal={showModal}
      handleModalAction={handleModalAction}
      handleScoreChange={handleScoreChange}
      handleScoreAction={handleScoreAction}
    />
  );
};

export default TaskScoringModalController;
