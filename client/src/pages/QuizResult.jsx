import { Link, useLocation } from "react-router-dom";

function QuizResult() {
    const location = useLocation();

    const result = location.state?.result;

    if (!result) {
        return (
            <div className="page-message">
                <h2>No quiz result found</h2>

                <Link to="/quizzes" className="btn">
                    Go to Quizzes
                </Link>
            </div>
        );
    }

    return (
        <div className="result-page">

            <div className="result-container">

                <div className="result-header">

                    <div className="result-icon">
                        🎉
                    </div>

                    <h1>Quiz Completed!</h1>

                    <h2>{result.quizTitle}</h2>

                </div>

                <div className="score-card">

                    <p>Your Score</p>

                    <h1>
                        {result.score} / {result.totalQuestions}
                    </h1>

                    <div className="percentage">
                        {result.percentage}%
                    </div>

                </div>

                <div className="result-stats">

                    <div className="stat-card correct">
                        <span>✅</span>

                        <h3>
                            {result.correctAnswers}
                        </h3>

                        <p>Correct Answers</p>
                    </div>

                    <div className="stat-card wrong">
                        <span>❌</span>

                        <h3>
                            {result.wrongAnswers}
                        </h3>

                        <p>Wrong Answers</p>
                    </div>

                    <div className="stat-card total">
                        <span>📝</span>

                        <h3>
                            {result.totalQuestions}
                        </h3>

                        <p>Total Questions</p>
                    </div>

                </div>

                <div className="review-section">

                    <h2>Question Review</h2>

                    {result.results.map(
                        (item, index) => (

                            <div
                                className={
                                    item.isCorrect
                                        ? "review-card correct-review"
                                        : "review-card wrong-review"
                                }
                                key={item.questionId}
                            >

                                <div className="review-title">

                                    <span>
                                        {item.isCorrect
                                            ? "✅"
                                            : "❌"}
                                    </span>

                                    <h3>
                                        {index + 1}.{" "}
                                        {item.question}
                                    </h3>

                                </div>

                                <div className="answer-review">

                                    <p>
                                        <strong>
                                            Your Answer:
                                        </strong>{" "}
                                        {item.userAnswer ||
                                            "Not answered"}
                                    </p>

                                    <p>
                                        <strong>
                                            Correct Answer:
                                        </strong>{" "}
                                        {item.correctAnswer}
                                    </p>

                                </div>

                            </div>

                        )
                    )}

                </div>

                <div className="result-actions">

                    <Link
                        to="/quizzes"
                        className="btn"
                    >
                        Take Another Quiz
                    </Link>

                    <Link
                        to="/"
                        className="home-btn"
                    >
                        Back to Home
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default QuizResult;