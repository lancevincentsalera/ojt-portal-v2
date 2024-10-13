import React, { useEffect, useState } from "react";
import InternListView from "../view/InternListView";
import { useAuth } from "../../../Common/AuthContext";
import { GetInternList } from "../model/InternListModel";

const InternListController = () => {
  const { userInfo } = useAuth();
  const [internList, setInternList] = useState([]);
  const [tableHeaders] = useState([
    "Name",
    "Email",
    "Designation",
    "Status",
    "Hours to Render",
  ]);

  useEffect(() => {
    const fetchInterns = async () => {
      const response = await GetInternList(userInfo.user.id);

      console.log(response);
      setInternList(response.interns);
    };

    fetchInterns();
  }, [userInfo.user.id]);

  return <InternListView internList={internList} tableHeaders={tableHeaders} />;
};

export default InternListController;
