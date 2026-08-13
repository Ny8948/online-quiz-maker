import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import QuizList from "./pages/QuizList";
import CreateQuiz from "./pages/CreateQuiz";
import TakeQuiz from "./pages/TakeQuiz";
import QuizResult from "./pages/QuizResult";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* PUBLIC ROUTES */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/quizzes"
                    element={<QuizList />}
                />


                {/* PROTECTED ROUTES */}

                <Route
                    path="/create-quiz"
                    element={
                        <ProtectedRoute>
                            <CreateQuiz />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/quiz/:id"
                    element={
                        <ProtectedRoute>
                            <TakeQuiz />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/quiz-result"
                    element={
                        <ProtectedRoute>
                            <QuizResult />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;