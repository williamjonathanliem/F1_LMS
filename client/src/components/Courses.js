import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📘 Courses</h2>
      <div className="row g-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div className="col-md-4" key={course.id}>
              <div className="card p-3 bg-dark text-white shadow-sm h-100">
                <h5 className="text-danger">{course.title}</h5>
                <p>{course.description}</p>
                <Link
                  to={`/lesson/${course.id}`}
                  className="btn btn-outline-danger mt-auto"
                >
                  View Lesson
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Loading courses...</p>
        )}
      </div>
    </div>
  );
}
