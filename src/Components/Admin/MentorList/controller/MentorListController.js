import React, { useEffect, useState } from "react";
import MentorListView from "../view/MentorListView";
import { Users } from "../../UsersDashboard/model/UsersModels";
import { useAuth } from "../../../Common/AuthContext";
import axios from "axios";
import { getAvailableSubMentors } from "../model/MentorListModel";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const MentorListController = () => {
  const [mentors, setMentors] = useState([]);
  const { authUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [headMentor, setHeadMentor] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleModalAction = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const mentors = await Users(authUser);

        const response = await Promise.all(
          mentors
            .filter((mentor) => mentor.userType === "Mentor")
            .map(async (mentor) => {
              const user = await axios.get(
                `${apiBaseUrl}/mentors/${mentor.id}`
              );
              return user.data;
            })
        );
        setMentors(response.filter((mentor) => mentor.subMentorCount > 0));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMentors();
  }, [authUser]);

  const fetchAvailableMentors = async (id) => {
    setLoading(true);
    try {
      const response = await getAvailableSubMentors(id);
      setHeadMentor(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MentorListView
      mentors={mentors}
      showModal={showModal}
      handleModalAction={handleModalAction}
      fetchAvailableMentors={fetchAvailableMentors}
      headMentor={headMentor}
      loading={loading}
    />
  );
};

export default MentorListController;
