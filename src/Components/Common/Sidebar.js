import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = ({ userRole }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const { authUser } = useAuth();
  const studentLinks = [
    {
      goto: "/intern-dashboard",
      name: "Dashboard",
    },
    {
      goto: "/training-plan",
      name: "Training Plan",
    },
    {
      goto: "/logbook-entries",
      name: "Logbook Entries",
    },
    {
      goto: "/logbook",
      name: "Submit Daily Logbook",
    },
  ];

  const supervisorLinks = [
    {
      goto: "/intern-monitoring",
      name: "Intern Monitoring",
    },
    {
      goto: "/task-monitoring",
      name: "Task Monitoring",
    },
    {
      goto: "/submitted-logbook",
      name: "View Logbook Submissions",
    },
    {
      goto: "/trainee-evaluation",
      name: "Evaluate Trainee",
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
    if (authUser) {
      switch (authUser.accountType) {
        case "ROLE_STUDENT":
          return studentLinks;
        case "ROLE_SUPERVISOR":
          return supervisorLinks;
        case "ROLE_CHAIR":
          return deanLinks;
        case "ROLE_ADMIN":
          return adminLinks;
        case "ROLE_INSTRUCTOR":
          return instructorLinks;
        default:
          return studentLinks;
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
            <li>
              <Link
                to={link.goto}
                onClick={() => setCurrentPageIndex(i)}
                key={i}
                className={currentPageIndex === i && "active"}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
        <li>
          <Link to="/" className="logout">
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
