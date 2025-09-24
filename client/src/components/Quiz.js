import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProgressContext } from "../context/progresscontext";
import { useContext } from "react";

export default function Quiz() {
  const { id } = useParams(); // course_id
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const { markLessonComplete } = useContext(ProgressContext);

  useEffect(() => {
    fetch(`http://localhost:5000/api/quiz/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Quiz fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading quiz...</p>;
  if (!questions.length) return <p>No quiz available for this course.</p>;

  const handleAnswer = (selected) => {
    if (selected === questions[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
      markLessonComplete(Number(id));
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-danger">Quiz</h3>

      {finished ? (
        <div className="alert alert-success">
          ✅ Quiz finished! You scored {score} / {questions.length}
        </div>
      ) : (
        <div className="card bg-dark text-white p-3">
          <h5>
            {currentIndex + 1}. {questions[currentIndex].question}
          </h5>
          <div className="mt-3">
            {questions[currentIndex].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="btn btn-outline-danger w-100 mb-2"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
