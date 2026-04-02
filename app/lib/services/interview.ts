import { Interview } from "@/app/lib/models/interview";
import { Question } from "@/app/lib/models/question";
import { sampleQuestions } from "@/app/lib/data/question";
import { connectDB } from "@/app/lib/db/db";
import mongoose from "mongoose";
type StartParams = {
  position: string;
  level: string;
  userId: mongoose.Types.ObjectId;
};
type AnswerParams = {
  interviewId: string;
  questionId: string;
  answer: string;
};

export async function startInterview({ position, level, userId }: StartParams) {
  await connectDB();

  const pos = position.toLowerCase();
  const lev = level.toLowerCase();

  const interview = await Interview.create({
    userId: new mongoose.Types.ObjectId(userId),
    position: pos,
    level: lev,
    startedAt: new Date(),
  });

  // pick up to 3 sample questions for the requested position+level
  const pool = sampleQuestions.filter(
    (q) => q.position === pos && q.level === lev,
  );

  const selected = pool.slice(0, 3);

  await Promise.all(
    selected.map((s) =>
      Question.create({
        interviewId: interview._id,
        type: s.type,
        level: s.level,
        position: s.position,
        options: s.options,
        question: s.question,
        expectedAnswer: s.answer,
        expectedScore: s.score ?? 1,
        score: 0,
      }),
    ),
  );

  return {
    interviewId: interview._id.toString(),
    redirect: `/interview/practice/${interview._id.toString()}`,
  };
}

export async function getInterviewDetail(interviewId: string) {
  await connectDB();

  const interview = await Interview.findById(interviewId);

  const questions = await Question.find({
    interviewId: interviewId,
  }).sort({ createdAt: 1 });

  return {
    interview,
    questions,
  };
}

export async function answerQuestion({
  interviewId,
  questionId,
  answer,
}: AnswerParams) {
  await connectDB();

  const q = await Question.findById(questionId);
  if (!q) throw new Error("Question not found");

  // grading: simple exact-match for mcq, 0 for text (placeholder)
  let gained = 0;
  if (q.type === "mcq") {
    if (
      q.expectedAnswer &&
      String(answer).trim() === String(q.expectedAnswer).trim()
    ) {
      gained = q.expectedScore || 1;
    }
  }

  q.givenAnswer = answer;
  q.score = gained;

  await q.save();

  // recalc interview aggregates
  const questions = await Question.find({ interviewId });
  const totalScore = questions.reduce((s, it) => s + (it.score || 0), 0);
  const maxScore = questions.reduce((s, it) => s + (it.expectedScore || 0), 0);
  const correct = questions.filter((it) => (it.score || 0) > 0).length;
  const percent = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  await Interview.findByIdAndUpdate(interviewId, {
    score: totalScore,
    correct,
    percent,
  });

  return { questionId, score: gained, totalScore, percent };
}

export async function finishInterview(interviewId: string) {
  await connectDB();

  const questions = await Question.find({ interviewId });
  const totalScore = questions.reduce((s, it) => s + (it.score || 0), 0);
  const maxScore = questions.reduce((s, it) => s + (it.expectedScore || 0), 0);
  const correct = questions.filter((it) => (it.score || 0) > 0).length;
  const percent = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  const interview = await Interview.findByIdAndUpdate(
    interviewId,
    { finishedAt: new Date(), score: totalScore, correct, percent },
    { new: true },
  );

  return { interview, totalScore, percent, correct };
}

export async function getHistory(userId: string) {
  await connectDB();
  return Interview.find({ userId }).sort({ createdAt: -1 }).limit(50);
}

export async function getInterviewById(id: string) {
  await connectDB();
  const interview = await Interview.findById(id);
  if (!interview) return null;
  const questions = await Question.find({ interviewId: interview._id });
  return { interview, questions };
}
