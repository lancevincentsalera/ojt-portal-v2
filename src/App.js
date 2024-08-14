import "./Styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Components/Common/AuthContext";
import LoginController from "./Components/UserManagement/Login/controller/LoginController";
import RegisterController from "./Components/UserManagement/Register/controller/RegisterController";
import ActivateAccountController from "./Components/UserManagement/ActivateAccount/controller/ActivateAccountController";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginController />} />
            <Route path="/register" element={<RegisterController />} />
            <Route
              path="/activate-account"
              element={<ActivateAccountController />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
