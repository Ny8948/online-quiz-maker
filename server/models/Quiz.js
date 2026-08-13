const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },

    options: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value.length === 4;
            },
            message: "Each question must have exactly 4 options"
        }
    },

    correctAnswer: {
        type: String,
        required: true
    }
});

const quizSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        questions: {
            type: [questionSchema],
            required: true,
            validate: {
                validator: function (value) {
                    return value.length > 0;
                },
                message: "Quiz must contain at least one question"
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Quiz", quizSchema);