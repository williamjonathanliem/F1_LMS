// client/src/components/Navbar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login
  };

  return (
    <nav className="navbar navbar-dark bg-black px-3">
      <Link to="/dashboard" className="navbar-brand text-danger fw-bold">
        🏎️ Formula 1 LMS
      </Link>
      <div>
        {user ? (
          <>
            <Link to="/dashboard" className="btn btn-outline-light me-2">
              Dashboard
            </Link>
            <Link to="/courses" className="btn btn-outline-danger me-2">
              Courses
            </Link>
            <Link to="/simulator" className="btn btn-outline-danger me-2">
              Simulator
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-danger btn-sm ms-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-light btn-sm me-2">
              Login
            </Link>
            <Link to="/signup" className="btn btn-danger btn-sm me-2">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
