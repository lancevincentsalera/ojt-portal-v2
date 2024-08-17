import "./Styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Components/Common/AuthContext";
import LoginController from "./Components/UserManagement/Login/controller/LoginController";
import RegisterController from "./Components/UserManagement/Register/controller/RegisterController";
import ActivateAccountController from "./Components/UserManagement/ActivateAccount/controller/ActivateAccountController";
import ForgotPasswordController from "./Components/UserManagement/ForgotPassword/controller/ForgotPasswordController";
import Sidebar from "./Components/Common/Sidebar";
import Header from "./Components/Common/Header";
import UsersController from "./Components/Admin/UsersDashboard/controller/UsersController";
import CompaniesController from "./Components/Admin/CompaniesDashboard/controller/CompaniesController";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Sidebar />
          <main>
            <Routes>
              <Route path="/" element={<LoginController />} />
              <Route path="/register" element={<RegisterController />} />
              <Route
                path="/activate-account"
                element={<ActivateAccountController />}
              />
              <Route
                path="/forgot-password"
                element={<ForgotPasswordController />}
              />
              <Route path="/admin-users" element={<UsersController />} />
              <Route
                path="/admin-companies"
                element={<CompaniesController />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
