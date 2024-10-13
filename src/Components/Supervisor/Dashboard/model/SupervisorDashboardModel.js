import axios from "axios";

const fetchLogbooks = async (mentorId, params = {}) => {
  try {
    const url = `${process.env.REACT_APP_API_BASE_URL}/logbooks/mentor/${mentorId}`;
    const response = await axios.get(url, { params });

    if (response.status === 200) {
      return response.data;
    } else {
      return "An error occurred while fetching the logbooks.";
    }
  } catch (error) {
    return "Error fetching logbooks.";
  }
};

export const RecentlySubmittedLogbooks = (userInfo) => {
  return fetchLogbooks(userInfo.user.id);
};

export const LogbooksAwaitingFeedback = (userInfo) => {
  return fetchLogbooks(userInfo.user.id, { logbookStatus: "Pending" });
};
