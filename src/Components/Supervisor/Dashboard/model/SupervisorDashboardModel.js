import { useGlobalState } from "../../../Globals/variables";

export const MentorDashboarModel = () => {
  const { getMentorLogbookSubmissions, getInternInfo } = useGlobalState();

  const RecentlySubmittedLogbooks = (userInfo) => {
    return getMentorLogbookSubmissions(userInfo.user.id);
  };

  const LogbooksAwaitingFeedback = (userInfo) => {
    return getMentorLogbookSubmissions(userInfo.user.id, {
      logbookStatus: "Pending",
    });
  };

  return { RecentlySubmittedLogbooks, LogbooksAwaitingFeedback, getInternInfo };
};
