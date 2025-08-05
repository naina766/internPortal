import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isGuest } = useAuth();
  return isGuest ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
