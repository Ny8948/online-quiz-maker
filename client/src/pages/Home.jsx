import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">
            <div className="hero">
                <h1>Online Quiz Maker 🧠</h1>

                <p>
                    Create quizzes, challenge yourself,
                    and test your knowledge.
                </p>

                <div className="home-buttons">
                    <Link to="/quizzes" className="btn">
                        Take a Quiz
                    </Link>

                    <Link to="/create-quiz" className="btn">
                        Create a Quiz
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;