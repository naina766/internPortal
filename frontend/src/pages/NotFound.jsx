import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container">
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for doesn't exist.</p>
    <Link to="/" className="btn link">Go to Login</Link>
  </div>
);

export default NotFound;
