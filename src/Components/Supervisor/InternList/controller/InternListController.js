import React, { useEffect, useState } from "react";
import InternListView from "../view/InternListView";
import { useAuth } from "../../../Common/AuthContext";
import { GetInternList } from "../model/InternListModel";
import LoadingModal from "../../../Common/Modals/LoadingModal";

const InternListController = () => {
  const { userInfo } = useAuth();
  const [internList, setInternList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableHeaders] = useState([
    "Name",
    "Email",
    "Designation",
    "Status",
    "Hours to Render",
  ]);

  useEffect(() => {
    const fetchInterns = async () => {
      setLoading(true);
      try {
        const response = await GetInternList(userInfo.user.id);
        setInternList(response.interns);
      } catch (error) {
        console.error("Failed to fetch interns", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterns();
  }, [userInfo.user.id]);

  return (
    <>
      <InternListView internList={internList} tableHeaders={tableHeaders} />
      <LoadingModal open={loading} />
    </>
  );
};

export default InternListController;
