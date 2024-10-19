import React, { useEffect, useState } from "react";
import CompaniesView from "../view/CompaniesView";
import { Companies } from "../model/CompaniesModel";
import LoadingModal from "../../../Common/Modals/LoadingModal";
import OkayModal from "../../../Common/Modals/OkayModal";
import ErrorModal from "../../../Common/Modals/ErrorModal";
import { useAuth } from "../../../Common/AuthContext";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;


const CompaniesController = () => {
  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn } = useAuth();

  const handleModalAction = () => setShowModal(!showModal);

  useEffect(() => {
    fetchCompanies();
  }, [isLoggedIn])

  const fetchCompanies = async() => {
    setIsSubmitting(true);
    setIsSubmitting(false);
    setIsSuccess(true);
    try {
      const response = await axios.get(`${apiBaseUrl}/companies`);
      setCompanies(response.data)
    } catch (error ) {
      setErrorMessage(errorDetail);
      const errorDetail = error.response?.data?.message || "Error fetching companies.";
      setIsError(true);
      setIsSubmitting(false);
    }
  }

  return (
    <div>
          <CompaniesView
        showModal={showModal}
        handleModalAction={handleModalAction}
        companies={companies}
      />
      <LoadingModal open={isSubmitting} />
      <OkayModal
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        message="Student performance fetched successfully!"
      />
      <ErrorModal
        open={isError}
        onClose={() => setIsError(false)}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default CompaniesController;
