import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function TakeQuiz() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/quizzes/${id}`
                );

                setQuiz(response.data.quiz);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to load quiz"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [id]);

    const handleAnswer = (answer) => {
        const questionId =
            quiz.questions[currentQuestion]._id;

        setAnswers({
            ...answers,
            [questionId]: answer
        });
    };

    const handleNext = () => {
        if (
            currentQuestion <
            quiz.questions.length - 1
        ) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login before submitting the quiz.");
                return;
            }

            const formattedAnswers = quiz.questions.map(
                (question) => ({
                    questionId: question._id,
                    answer: answers[question._id] || ""
                })
            );

            const response = await axios.post(
                `http://localhost:5000/api/quizzes/${id}/submit`,
                {
                    answers: formattedAnswers
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            navigate("/quiz-result", {
                state: {
                    result: response.data.result
                }
            });

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to submit quiz"
            );
        }
    };

    if (loading) {
        return (
            <div className="page-message">
                <h2>Loading Quiz...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-message">
                <p className="error-message">
                    {error}
                </p>
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="page-message">
                <h2>Quiz not found</h2>
            </div>
        );
    }

    const question =
        quiz.questions[currentQuestion];

    const selectedAnswer =
        answers[question._id] || "";

    const isLastQuestion =
        currentQuestion ===
        quiz.questions.length - 1;

    return (
        <div className="take-quiz-page">

            <div className="take-quiz-container">

                <div className="quiz-top">

                    <div>
                        <h1>{quiz.title} 🧠</h1>

                        <p>
                            {quiz.description}
                        </p>
                    </div>

                    <span className="question-count">
                        Question {currentQuestion + 1} of{" "}
                        {quiz.questions.length}
                    </span>

                </div>

                <div className="progress-container">

                    <div
                        className="progress-bar"
                        style={{
                            width: `${
                                ((currentQuestion + 1) /
                                    quiz.questions.length) *
                                100
                            }%`
                        }}
                    ></div>

                </div>

                <div className="take-question-card">

                    <h2>
                        {currentQuestion + 1}.{" "}
                        {question.questionText}
                    </h2>

                    <div className="answer-options">

                        {question.options.map(
                            (option, index) => (

                                <label
                                    className={
                                        selectedAnswer === option
                                            ? "answer-option selected"
                                            : "answer-option"
                                    }
                                    key={index}
                                >

                                    <input
                                        type="radio"
                                        name={`question-${question._id}`}
                                        value={option}
                                        checked={
                                            selectedAnswer === option
                                        }
                                        onChange={() =>
                                            handleAnswer(option)
                                        }
                                    />

                                    <span>
                                        {option}
                                    </span>

                                </label>

                            )
                        )}

                    </div>

                </div>

                <div className="quiz-navigation">

                    <button
                        type="button"
                        className="previous-btn"
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                    >
                        ← Previous
                    </button>

                    {!isLastQuestion ? (

                        <button
                            type="button"
                            className="next-btn"
                            onClick={handleNext}
                        >
                            Next →
                        </button>

                    ) : (

                        <button
                            type="button"
                            className="submit-quiz-btn"
                            onClick={handleSubmit}
                        >
                            Submit Quiz ✓
                        </button>

                    )}

                </div>

            </div>

        </div>
    );
}

export default TakeQuiz;