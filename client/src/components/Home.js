import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mt-5 text-center">
      <h1>Be the 13th F1 Team</h1>
      <p>Learn race strategy by simulation.</p>
      <Link to="/courses" className="btn btn-danger btn-lg mt-3">
        Start Learning
      </Link>
    </div>
  );
}
