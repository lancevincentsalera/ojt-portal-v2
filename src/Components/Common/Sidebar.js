import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = ({ userRole }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const { isLoggedIn, handleLogout, userInfo, timeIn } = useAuth();
  const studentLinks = [
    {
      goto: "/intern-attendance",
      name: "Attendance",
    },
    {
      goto: "/intern-dashboard",
      name: "Dashboard",
    },
    {
      goto: "/intern-tp",
      name: "Training Plan",
    },
    {
      goto: "/intern-entries",
      name: "My Logbooks",
    },
    {
      goto: "/intern-submit",
      name: "Submit Logbook",
    },
  ];

  const supervisorLinks = [
    {
      goto: "/supervisor-dashboard",
      name: "Dashboard",
    },
    {
      goto: "/supervisor-intern-list",
      name: "Interns",
    },
    {
      goto: "/supervisor-evaluations",
      name: "Evaluations",
    },
    {
      goto: "/supervisor-tp",
      name: "Training Plans",
    },

    {
      goto: "/supervisor-submissions",
      name: "Logbook Submissions",
    },
  ];

  const deanLinks = [
    {
      goto: "/student-monitoring",
      name: "Student Monitoring",
    },
    {
      goto: "/ojt-analytics",
      name: "OJT Analytics",
    },
  ];

  const adminLinks = [
    {
      goto: "/admin-users",
      name: "Users",
    },
    {
      goto: "/admin-companies",
      name: "Companies",
    },
    {
      goto: "/admin-ojt-records",
      name: "OJT Records",
    },
    {
      goto: "/admin-training-plans",
      name: "Training Plans",
    },
  ];

  const instructorLinks = [
    {
      goto: "/student-data",
      name: "Instructor Dashboard",
    },
    {
      goto: "/ojt-analytics",
      name: "OJT Analytics",
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getLinks = () => {
    console.log(isLoggedIn);
    console.log(userInfo);

    if (!isLoggedIn || !userInfo) return [];

    const userType = userInfo.user ? userInfo.user.userType : userInfo.userType;
    if (isLoggedIn) {
      switch (userType) {
        case "Student":
          return studentLinks.map(link => ({
            ...link,
            disabled: timeIn === null && link.name !== "Attendance"
          }));
        case "Mentor":
          return supervisorLinks;
        case "Chair":
          return deanLinks;
        case "Admin":
          return adminLinks;
        case "Teacher":
          return instructorLinks;
        default:
          return supervisorLinks;
      }
    }
  };

  const [links] = useState(getLinks());

  useEffect(() => {
    setCurrentPageIndex(
      links.findIndex((link) => link.goto === window.location.pathname)
    );
  }, [links]);

  return (
    <div className="Sidebar">
      <ul className="clicked-option">
        {links.map((link, i) => {
          return (
            <li key={i}>
              <Link
                to={link.disabled ? "#" : link.goto}
                onClick={link.disabled ? (e) => e.preventDefault() : () => setCurrentPageIndex(i)}
                className={
                  `${currentPageIndex === i ? "active" : ""} ${link.disabled ? "disabled" : ""}`
                }
                style={link.disabled ? { pointerEvents: "none", opacity: 0.5 } : {}}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
        <li>
          <Link to="/" className="logout" onClick={handleLogout}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ fontSize: "20" }}
            />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;