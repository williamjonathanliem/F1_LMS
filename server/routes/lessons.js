// server/routes/lessons.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// get lesson by course_id
router.get("/:courseId", (req, res) => {
  const { courseId } = req.params;

  db.query(
    "SELECT * FROM lessons WHERE course_id = ?",
    [courseId],
    (err, results) => {
      if (err) {
        console.error("❌ DB error fetching lesson:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      res.json(results[0]);
    }
  );
});

export default router;
