const Quiz = require("../models/Quiz");

// ==========================================
// CREATE QUIZ
// ==========================================
const createQuiz = async (req, res) => {
    try {
        const { title, description, questions } = req.body;

        // Check title and questions
        if (!title || !questions || questions.length === 0) {
            return res.status(400).json({
                message: "Title and questions are required"
            });
        }

        // Create quiz
        const quiz = await Quiz.create({
            title,
            description,
            questions,

            // IMPORTANT:
            // JWT contains { id: user._id }
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Quiz created successfully",
            quiz
        });

    } catch (error) {
        console.error("CREATE QUIZ ERROR:", error);

        res.status(500).json({
            message: "Failed to create quiz",
            error: error.message
        });
    }
};


// ==========================================
// GET ALL QUIZZES
// ==========================================
const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find()
            .populate("createdBy", "name email")
            .select("-questions.correctAnswer");

        res.json({
            quizzes
        });

    } catch (error) {
        console.error("GET QUIZZES ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch quizzes",
            error: error.message
        });
    }
};


// ==========================================
// GET SINGLE QUIZ
// ==========================================
const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
            .populate("createdBy", "name email");

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        res.json({
            quiz
        });

    } catch (error) {
        console.error("GET QUIZ ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch quiz",
            error: error.message
        });
    }
};


// ==========================================
// SUBMIT QUIZ
// ==========================================
const submitQuiz = async (req, res) => {
    try {
        const { answers } = req.body;

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({
                message: "Answers are required"
            });
        }

        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        let score = 0;

        const results = quiz.questions.map((question) => {

            const submittedAnswer = answers.find(
                (answer) =>
                    answer.questionId.toString() ===
                    question._id.toString()
            );

            const userAnswer = submittedAnswer
                ? submittedAnswer.answer
                : null;

            const isCorrect =
                userAnswer === question.correctAnswer;

            if (isCorrect) {
                score++;
            }

            return {
                questionId: question._id,
                question: question.questionText,
                userAnswer,
                correctAnswer: question.correctAnswer,
                isCorrect
            };
        });

        const totalQuestions = quiz.questions.length;

        const percentage =
            totalQuestions === 0
                ? 0
                : Math.round(
                    (score / totalQuestions) * 100
                );

        res.json({
            message: "Quiz submitted successfully",

            result: {
                quizId: quiz._id,
                quizTitle: quiz.title,
                totalQuestions,
                correctAnswers: score,
                wrongAnswers: totalQuestions - score,
                score,
                percentage,
                results
            }
        });

    } catch (error) {
        console.error("SUBMIT QUIZ ERROR:", error);

        res.status(500).json({
            message: "Failed to submit quiz",
            error: error.message
        });
    }
};


// ==========================================
// EXPORT
// ==========================================
module.exports = {
    createQuiz,
    getQuizzes,
    getQuizById,
    submitQuiz
};