import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const ActivateAccountView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); 
    }, 5000); 

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="container">
      <div className="activate">
        <p className="heading">Account Activation</p>
        <p className="description">
          Your account has been created successfully! Please view your 
          email to activate account.
        </p>
        {/* <form className="activate-content">
          <label htmlFor="ActivateAccount">Activation Code</label>
          <input
            type="text"
            name="ActivateAccount"
            placeholder="Enter your activation code"
          />
          <button type="submit" className="button-main">
            Activate Account
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default ActivateAccountView;
