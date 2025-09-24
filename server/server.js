// server/server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import courseRoutes from "./routes/courses.js";
import userRoutes from "./routes/users.js";
import quizRoutes from "./routes/quiz.js";
import authRoutes from "./routes/auth.js";
import lessonRoutes from "./routes/lessons.js";

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

// Routes
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/auth", authRoutes);

// Default
app.get("/", (req, res) => {
  res.send("F1 LMS API running...");
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
