import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1>Dashboard</h1>
            {user.role === "admin" ? (
                <p>Welcome Admin! You can manage books.</p>
            ) : (
                <p>Welcome User! You can view books.</p>
            )}
        </div>
    );
};

export default Dashboard;
