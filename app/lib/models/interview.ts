import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: String,
    level: String,
    score: {
      type: Number,
      default: 0,
    },
    correct: {
      type: Number,
      default: 0,
    },
    percent: {
      type: Number,
      default: 0,
    },
    startedAt: Date,
    finishedAt: Date,
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  },
);

export const Interview =
  mongoose.models.Interview || mongoose.model("Interview", InterviewSchema);
