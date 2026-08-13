# 🧠 Online Quiz Maker

A full-stack web application that allows users to create, browse, and take multiple-choice quizzes with instant results and score calculation.

This project was developed as part of my **CODSOFT internship/project work** to strengthen practical skills in full-stack web development.

---

## 🚀 Live Project

Coming Soon — Deployment in progress

---

## 📌 Project Overview

Online Quiz Maker is a full-stack quiz platform where users can:

- Register and login securely
- Create their own quizzes
- Add multiple questions
- Add multiple-choice options
- Select correct answers
- Browse available quizzes
- Take quizzes one question at a time
- Submit answers
- Get instant scores
- View correct and incorrect answers

The application uses **JWT Authentication** to protect user-specific operations such as creating and submitting quizzes.

---

## ✨ Features

### 🔐 User Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout
- Personalized user experience

### 📝 Quiz Creation

- Create a new quiz
- Add quiz title
- Add quiz description
- Add multiple questions
- Add four multiple-choice options
- Select the correct answer
- Save quiz to MongoDB

### 📚 Quiz Listing

- Display available quizzes
- Show quiz title
- Show quiz description
- Show quiz creator
- Take available quizzes

### 🧠 Quiz Taking

- Display one question at a time
- Select an answer
- Previous/Next navigation
- Progress indicator
- Submit quiz

### 📊 Quiz Results

After submitting a quiz, users receive:

- Total questions
- Correct answers
- Wrong answers
- Score
- Percentage
- User's selected answer
- Correct answer
- Question-by-question feedback

### 📱 Responsive Design

The application works well on:

- Desktop
- Laptop
- Mobile
- Tablet

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- React Router
- Axios
- Vite

### Backend

- Node.js
- Express.js
- REST API
- JWT
- bcryptjs

### Database

- MongoDB
- Mongoose
- MongoDB Atlas

### Development Tools

- VS Code
- Git
- GitHub
- Postman
- Thunder Client
- Nodemon

---

## 🏗️ Project Structure

```text
online-quiz-maker/
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── QuizList.jsx
│   │   │   ├── CreateQuiz.jsx
│   │   │   ├── TakeQuiz.jsx
│   │   │   └── QuizResult.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── quizController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Quiz.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── quizRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
