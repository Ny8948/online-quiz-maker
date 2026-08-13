import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateQuiz() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [questions, setQuestions] = useState([
        {
            questionText: "",
            options: ["", "", "", ""],
            correctAnswer: ""
        }
    ]);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleQuestionChange = (index, value) => {
        const updated = [...questions];

        updated[index].questionText = value;

        setQuestions(updated);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updated = [...questions];

        updated[questionIndex].options[optionIndex] = value;

        setQuestions(updated);
    };

    const handleCorrectAnswer = (index, value) => {
        const updated = [...questions];

        updated[index].correctAnswer = value;

        setQuestions(updated);
    };

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                questionText: "",
                options: ["", "", "", ""],
                correctAnswer: ""
            }
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
            setError("Please login first.");
            return;
        }

        try {
            await axios.post(
                "http://localhost:5000/api/quizzes",
                {
                    title,
                    description,
                    questions
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("Quiz created successfully! 🎉");

            setTimeout(() => {
                navigate("/quizzes");
            }, 1000);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to create quiz"
            );
        }
    };

    return (
        <div className="create-quiz-page">

            <div className="create-quiz-container">

                <h1>Create New Quiz 🧠</h1>

                <p className="create-subtitle">
                    Create your own quiz.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="quiz-basic-info">

                        <label>Quiz Title</label>

                        <input
                            type="text"
                            placeholder="Enter quiz title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                        />

                        <label>Description</label>

                        <textarea
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                    </div>

                    {questions.map((question, index) => (

                        <div
                            className="question-card"
                            key={index}
                        >

                            <h2>
                                Question {index + 1}
                            </h2>

                            <input
                                type="text"
                                placeholder="Enter question"
                                value={question.questionText}
                                onChange={(e) =>
                                    handleQuestionChange(
                                        index,
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <h3>Options</h3>

                            {question.options.map(
                                (option, optionIndex) => (

                                    <input
                                        key={optionIndex}
                                        type="text"
                                        placeholder={`Option ${optionIndex + 1}`}
                                        value={option}
                                        onChange={(e) =>
                                            handleOptionChange(
                                                index,
                                                optionIndex,
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                )
                            )}

                            <label>
                                Correct Answer
                            </label>

                            <select
                                value={question.correctAnswer}
                                onChange={(e) =>
                                    handleCorrectAnswer(
                                        index,
                                        e.target.value
                                    )
                                }
                                required
                            >

                                <option value="">
                                    Select correct answer
                                </option>

                                {question.options.map(
                                    (option, optionIndex) => (

                                        <option
                                            key={optionIndex}
                                            value={option}
                                            disabled={!option}
                                        >
                                            {option ||
                                                `Option ${optionIndex + 1}`}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                    ))}

                    <button
                        type="button"
                        className="add-question-btn"
                        onClick={addQuestion}
                    >
                        + Add Question
                    </button>

                    <button
                        type="submit"
                        className="submit-quiz-btn"
                    >
                        Create Quiz
                    </button>

                    {message && (
                        <p className="success-message">
                            {message}
                        </p>
                    )}

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                </form>

            </div>

        </div>
    );
}

export default CreateQuiz;