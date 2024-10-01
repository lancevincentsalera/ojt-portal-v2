import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>Sorry, the page you are looking for doesn't exist.</p>
      <Link to="/" className="btn-back-home">Go Back to Login</Link>
    </div>
  );
};

export default NotFound;
