// server/routes/quiz.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all quizzes for a course
router.get("/:courseId", (req, res) => {
  const { courseId } = req.params;

  const sql = "SELECT * FROM quizzes WHERE course_id = ?";
  db.query(sql, [courseId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching quizzes:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Format results into frontend-friendly JSON
    const formatted = results.map((row) => ({
      id: row.id,
      question: row.question,
      options: [row.option_a, row.option_b, row.option_c],
      answer: row.correct_answer,
    }));

    res.json(formatted);
  });
});

export default router;
