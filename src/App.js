import "./Styles/App.scss";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./Components/Common/AuthContext";
import LoginController from "./Components/UserManagement/Login/controller/LoginController";
import RegisterController from "./Components/UserManagement/Register/controller/RegisterController";
import ActivateAccountController from "./Components/UserManagement/ActivateAccount/controller/ActivateAccountController";
import ForgotPasswordController from "./Components/UserManagement/ForgotPassword/controller/ForgotPasswordController";
import Sidebar from "./Components/Common/Sidebar";
import Header from "./Components/Common/Header";
import UsersController from "./Components/Admin/UsersDashboard/controller/UsersController";
import CompaniesController from "./Components/Admin/CompaniesDashboard/controller/CompaniesController";
import OJTRecordsController from "./Components/Admin/OJTRecordsDashboard/controller/OJTRecordsController";
import TrainingPlansController from "./Components/Admin/TrainingPlansDashboard/controller/TrainingPlansController";
import InternDashboardController from "./Components/Intern/InternDashboard/controller/InternDashboardController";
import TrainingPlanController from "./Components/Intern/TrainingPlan/controller/TrainingPlanController";
import SubmissionsController from "./Components/Intern/LogbookSubmissions/controller/SubmissionsController";
import SubmitLogbookController from "./Components/Intern/SubmitLogbook/controller/SubmitLogbookController";
import SupervisorDashboardController from "./Components/Supervisor/Dashboard/controller/SupervisorDashboardController";
import InternListController from "./Components/Supervisor/InternList/controller/InternListController";
import SupervisorEvaluationsController from "./Components/Supervisor/Evaluations/controller/SupervisorEvaluationsController";
import { GlobalStateProvider, useGlobalState } from "./Components/Globals/variables";
import NotFound from "./Components/Common/NotFound";
import InternAttendanceController from "./Components/Intern/Attendance/controller/InternAttendanceController";

const ProtectedRoute = ({ children }) => {
  const { authUser, isLoggedIn } = useAuth();
  const { setAllowPath } = useGlobalState();

  if (!authUser || !isLoggedIn) {
    setAllowPath(false); 
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
};

const ConditionalRoute = ({ children }) => {
  const { allowPath } = useGlobalState(); 

  if (!allowPath) {
    return <NotFound />; 
  }
  return children ? children : <Outlet />;
};

const Layout = () => {
  const hideSidebarPaths = ["/", "/register", "/forgot-password", "/activate-account"];
  const { pathname } = useLocation();

  return (
    <div className="App">
      <Header />
      {!hideSidebarPaths.includes(pathname) && <Sidebar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <GlobalStateProvider>
          <Routes>
            <Route path="/" element={<LoginController />} />
            <Route path="/register" element={<RegisterController />} />
            <Route path="/forgot-password" element={<ForgotPasswordController />} />

            <Route
              path="/activate-account"
              element={
                <ConditionalRoute>
                  <ActivateAccountController />
                </ConditionalRoute>
              }
            />

            <Route element={<Layout />}>
              <Route element={<ProtectedRoute />}>
                <Route path="/admin-users" element={<UsersController />} />
                <Route path="/admin-companies" element={<CompaniesController />} />
                <Route path="/admin-ojt-records" element={<OJTRecordsController />} />
                <Route path="/admin-training-plans" element={<TrainingPlansController />} />
                <Route path="/intern-attendance" element={<InternAttendanceController />} />
                <Route path="/intern-dashboard" element={<InternDashboardController />} />
                <Route path="/intern-tp" element={<TrainingPlanController />} />
                <Route path="/intern-entries" element={<SubmissionsController />} />
                <Route path="/intern-submit" element={<SubmitLogbookController />} />
                <Route path="/supervisor-dashboard" element={<SupervisorDashboardController />} />
                <Route path="/supervisor-intern-list" element={<InternListController />} />
                <Route path="/supervisor-evaluations" element={<SupervisorEvaluationsController />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </GlobalStateProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;
