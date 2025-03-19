import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  return (
    <>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/dashboard">DashBoard</NavLink>
      </div>
    </>
  );
};

export default Navbar;
