import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="navbar-container">

                <Link to="/" className="navbar-logo">
                    🧠 Online Quiz Maker
                </Link>

                <div className="navbar-links">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/quizzes">
                        Quizzes
                    </Link>

                    {token && (
                        <Link to="/create-quiz">
                            Create Quiz
                        </Link>
                    )}

                    {!token ? (
                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="register-link"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="logout-btn"
                        >
                            Logout
                        </button>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;