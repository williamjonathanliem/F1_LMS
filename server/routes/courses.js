import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all courses
router.get("/", (req, res) => {
  db.query("SELECT * FROM courses", (err, results) => {
    if (err) {
      console.error("❌ Error fetching courses:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Get a course by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM courses WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching course:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(results[0]);
  });
});

export default router;
