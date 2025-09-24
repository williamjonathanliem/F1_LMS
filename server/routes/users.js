import express from "express";
const router = express.Router();

let userProgress = { 1: 40 }; // in-memory progress store for demo

// Get user progress
router.get("/:id/progress", (req, res) => {
  res.json({ userId: req.params.id, progress: userProgress[req.params.id] || 0 });
});

// Update user progress
router.post("/:id/progress", (req, res) => {
  const { progress } = req.body;
  userProgress[req.params.id] = progress;
  res.json({ message: "Progress updated", progress });
});

export default router;
