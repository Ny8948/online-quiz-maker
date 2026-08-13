import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function QuizList() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/quizzes"
                );

                setQuizzes(response.data.quizzes);

            } catch (error) {
                setError("Failed to load quizzes");
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) {
        return <h2 className="page-message">Loading quizzes...</h2>;
    }

    return (
        <div className="quiz-list-page">

            <div className="quiz-list-header">

                <div>
                    <h1>Available Quizzes 🧠</h1>
                    <p>Choose a quiz and test your knowledge.</p>
                </div>

                <Link
                    to="/create-quiz"
                    className="btn"
                >
                    + Create Quiz
                </Link>

            </div>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {quizzes.length === 0 ? (
                <div className="empty-state">
                    <h2>No quizzes available</h2>
                    <p>Create the first quiz!</p>
                </div>
            ) : (
                <div className="quiz-grid">

                    {quizzes.map((quiz) => (

                        <div
                            className="quiz-card"
                            key={quiz._id}
                        >

                            <h2>{quiz.title}</h2>

                            <p>
                                {quiz.description}
                            </p>

                            <div className="quiz-info">
                                <span>
                                    📝 {quiz.questions.length} Questions
                                </span>

                                <span>
                                    👤 {quiz.createdBy?.name}
                                </span>
                            </div>

                            <Link
                                to={`/quiz/${quiz._id}`}
                                className="btn"
                            >
                                Take Quiz
                            </Link>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default QuizList;