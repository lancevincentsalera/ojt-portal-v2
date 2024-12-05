import React, { useEffect, useState } from "react";
import TaskMonitoringView from "../view/TaskMonitoringView";
import { useAuth } from "../../../Common/AuthContext";
import { fetchStudentsByMentor } from "../../TrainingPlans/model/MentorTrainingPlanModel";
import { internTrainingPlan } from "../model/TaskMonitoringModel";
import LoadingModal from "../../../Common/Modals/LoadingModal";

const TaskMonitoringController = () => {
  const { userInfo } = useAuth();
  const [mentorInterns, setMentorInterns] = useState({});
  const [tasks, setTasks] = useState([]);
  const [internId, setInternId] = useState(0);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(false);

  const handleModalAction = (id) => {
    setTask(tasks.find((task) => task.trainingTask.id === id));
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const id = parseInt(value, 10);
    setInternId(id);
  };

  useEffect(() => {
    const fetchMentorInterns = async () => {
      setLoading(true);
      try {
        const response = await fetchStudentsByMentor(userInfo.user.id);
        setMentorInterns(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorInterns();
  }, [userInfo.user.id]);

  useEffect(() => {
    const fetchTrainingPlanTasks = async () => {
      try {
        if (!internId) {
          setIsError(true);
          setError("Please select an intern");
          return;
        }
        const response = await internTrainingPlan(internId);

        if (response.notFound) {
          setIsError(true);
          setError("Intern has not yet been assigned a training plan");
        } else {
          setIsError(false);
          setTasks(response.tasks);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrainingPlanTasks();
  }, [internId]);

  return (
    <>
      <TaskMonitoringView
        mentorInterns={mentorInterns.interns}
        tasks={tasks}
        handleChange={handleChange}
        error={error}
        isError={isError}
        showModal={showModal}
        handleModalAction={handleModalAction}
        task={task}
        internId={internId}
      />
      <LoadingModal open={loading} />
    </>
  );
};

export default TaskMonitoringController;
