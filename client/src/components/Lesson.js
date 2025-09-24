import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Lesson() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/lessons/${id}`)
      .then((res) => res.json())
      .then((data) => setLesson(data));
  }, [id]);

  if (!lesson) return <p className="text-center mt-5">Loading lesson...</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-danger">{lesson.title}</h2>
      <div
        className="card p-3 bg-dark text-white"
        style={{ whiteSpace: "pre-line" }}
      >
        {lesson.content}
      </div>
      <Link to={`/quiz/${lesson.id}`} className="btn btn-danger mt-3">
        Take Quiz
      </Link>
    </div>
  );
}
