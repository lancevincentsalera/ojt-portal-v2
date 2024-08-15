
import ForgotPasswordModalView from "../view/ForgotPasswordModalView";

const ForgotPasswordModalController = ({ showModal, handleModalAction }) => {
  return (
    <ForgotPasswordModalView
      showModal={showModal}
      handleModalAction={handleModalAction}
    />
  );
};

export default ForgotPasswordModalController;
