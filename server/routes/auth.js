// server/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import db from "../db.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("❌ Signup error:", err);
          return res.status(500).json({ error: "Signup failed" });
        }

        const newUserId = result.insertId;

        // Auto-create progress for all courses
        db.query("SELECT id FROM courses", (err, courses) => {
          if (err) return res.status(500).json({ error: "Signup failed" });

          const values = courses.map((c) => [newUserId, c.id, 0, 0]);
          db.query(
            "INSERT INTO progress (user_id, course_id, completed, score) VALUES ?",
            [values],
            (err2) => {
              if (err2) {
                console.error("❌ Progress error:", err2);
                return res.status(500).json({ error: "Signup failed" });
              }
              return res.json({
                message: "Signup successful! Please log in.",
              });
            }
          );
        });
      }
    );
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("❌ Login DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password || "");

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      delete user.password;
      res.json({ message: "Login successful", user });

    } catch (err) {
      console.error("❌ Bcrypt error:", err.message);
      return res.status(500).json({ error: "Server error during login" });
    }
  });
});





export default router;
