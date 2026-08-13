const express = require("express");

const {
    createQuiz,
    getQuizzes,
    getQuizById,
    submitQuiz
} = require("../controllers/quizController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create quiz - login required
router.post("/", protect, createQuiz);

// Get all quizzes
router.get("/", getQuizzes);

// Get one quiz
router.get("/:id", getQuizById);

// Submit quiz
router.post("/:id/submit", protect, submitQuiz);

module.exports = router;