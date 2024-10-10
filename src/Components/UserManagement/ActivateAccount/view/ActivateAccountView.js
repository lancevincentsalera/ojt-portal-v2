import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../Globals/variables";

const ActivateAccountView = ({ handleResendActivationEmail }) => {
  const navigate = useNavigate();
  const { isLoading, error } = useGlobalState();

  const countdownDuration = 120;

  const getRemainingTime = () => {
    const savedTime = localStorage.getItem("activationStartTime");
    if (savedTime) {
      const elapsedTime = Math.floor((Date.now() - savedTime) / 1000);
      const remainingTime = countdownDuration - elapsedTime;
      return remainingTime > 0 ? remainingTime : 0;
    }
    return countdownDuration;
  };

  const [timer, setTimer] = useState(getRemainingTime);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      if (!localStorage.getItem("activationStartTime")) {
        localStorage.setItem("activationStartTime", Date.now());
      }

      const intervalId = setInterval(() => {
        setTimer(getRemainingTime);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setIsButtonDisabled(false);
      localStorage.removeItem("activationStartTime");
    }
  }, [timer]);

  return (
    <div className="container">
      <div className="activate">
        <p className="heading">Account Activation</p>
        <p className="description">
          Your account has been created successfully! Please check your email to
          activate your account.
        </p>

        {error && <div className="error">{error}</div>}

        {/* Small text for the timer */}
        <p
          style={{
            fontSize: "20px",
            marginTop: 10,
            marginBottom: 10,
            color: "#ff6b6b",
          }}
        >
          {`You can resend the activation email in ${timer} seconds`}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {isLoading ? (
            <button
              type="submit"
              className="button-main"
              disabled
              style={{ fontSize: "12px" }}
            >
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="button-main"
              onClick={handleResendActivationEmail}
              disabled={isButtonDisabled}
              style={{ fontSize: "12px" }}
            >
              Resend Activation Email
            </button>
          )}

          <button
            type="submit"
            className="button-secondary"
            onClick={() => navigate("/")}
            style={{ fontSize: "12px" }}
          >
            Proceed to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivateAccountView;
