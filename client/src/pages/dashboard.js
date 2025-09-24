import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authcontext";

export default function Dashboard() {
  const { user, token } = useContext(AuthContext);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5000/api/progress", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProgress(data));
  }, [token]);

  if (!user) return <p className="text-center mt-5">Please log in.</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-danger">Welcome, {user.name}!</h2>
      <p>Your progress: {progress.length} courses tracked.</p>
    </div>
  );
}
