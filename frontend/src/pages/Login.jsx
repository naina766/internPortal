import { useNavigate } from "react-router-dom";
import {useAuth} from '../context/AuthContext'
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const {loginAsGuest} = useAuth();

  const handleLogin = () => {
    loginAsGuest();
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Intern Portal</h1>
        <p className="login-subtext">Welcome! Access your dashboard below.</p>
        <button className="login-btn" onClick={handleLogin}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default Login;
// pageYOffset