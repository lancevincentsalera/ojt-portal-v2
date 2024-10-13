import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = ({ userRole }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const { isLoggedIn, handleLogout, userInfo } = useAuth();
  const studentLinks = [
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
    if (isLoggedIn) {
      switch (userInfo.user.userType) {
        case "Student":
          return studentLinks;
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
    // setCurrentPageIndex(
    //   studentLinks.findIndex((link) => link.goto === window.location.pathname)
    // );
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
