import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
    },
    type: String,
    level: String,
    position: String,
    options: [mongoose.Schema.Types.Mixed],
    question: String,
    expectedAnswer: mongoose.Schema.Types.Mixed,
    givenAnswer: mongoose.Schema.Types.Mixed,
    expectedScore: {
      type: Number,
      default: 1,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Question =
  mongoose.models.Question || mongoose.model("Question", QuestionSchema);
