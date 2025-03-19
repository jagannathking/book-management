import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <h2>Welcome, {user?.name || "User"}!</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
