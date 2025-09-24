// client/src/components/Dashboard.js
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ProgressContext } from "../context/progresscontext";
import { AuthContext } from "../context/authcontext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const { completedLessons } = useContext(ProgressContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
<div className="container mt-4">
      {user && (
        <h5 className="text-end text-muted">
          👋 Hi, <span className="fw-bold text-danger">{user.name}</span>
        </h5>
      )}

      {/* Hero section */}
      <div className="p-5 mb-4 bg-dark text-white rounded shadow-sm">
        <h1 className="display-6 fw-bold text-danger">
          🏎️ Welcome to F1 Strategy LMS
        </h1>
        <p>Learn, simulate, and test your skills as the 13th F1 Team.</p>
        {courses[0] && (
          <Link
            to={`/lesson/${courses[0].id}`}
            className="btn btn-danger btn-lg mt-2"
          >
            Continue: {courses[0].title} →
          </Link>
        )}
      </div>

      {/* Progress */}
      <h4>📊 Your Progress</h4>
      {completedLessons.length > 0 ? (
        <ul className="list-group mt-3">
          {courses.map((course) => (
            <li
              key={course.id}
              className={`list-group-item d-flex justify-content-between ${
                completedLessons.includes(Number(course.id))
                  ? "list-group-item-success"
                  : "list-group-item-dark"
              }`}
            >
              <span>{course.title}</span>
              {completedLessons.includes(Number(course.id)) ? "✅ Completed" : "❌ Not Completed"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No progress yet.</p>
      )}

      {/* Lessons */}
      <h4 className="mt-5">📚 Lessons</h4>
      <div className="list-group">
        {courses.map((course) => (
          <div
            key={course.id}
            className="list-group-item bg-dark text-white d-flex justify-content-between"
          >
            <span>{course.title}</span>
            <Link
              to={`/lesson/${course.id}`}
              className="btn btn-sm btn-outline-danger"
            >
              Start
            </Link>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <h4 className="mt-5">🏆 Achievements</h4>
      <p>Earn badges as you complete quizzes and simulations!</p>
    </div>
  );
}
