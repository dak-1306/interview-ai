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
        expectedAnswer: (s as any).expectedAnswer,
        expectedScore: (s as any).expectedScore ?? 1,
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
  // Only persist givenAnswer (progress). Final scoring will be computed in finishInterview.
  q.givenAnswer = answer;
  await q.save();

  return { interviewId, questionId };
}

export async function finishInterview(interviewId: string) {
  await connectDB();
  const session = await mongoose.startSession();
  let resultInterview = null;
  let totalScore = 0;
  let percent = 0;
  let correct = 0;
  try {
    await session.withTransaction(async () => {
      const questions = await Question.find({ interviewId }).session(session);

      let maxScore = 0;
      totalScore = 0;
      correct = 0;

      for (const q of questions) {
        let gained = 0;
        if (q.type === "mcq") {
          if (
            q.expectedAnswer &&
            q.givenAnswer &&
            String(q.givenAnswer).trim() === String(q.expectedAnswer).trim()
          ) {
            gained = q.expectedScore || 1;
          }
        }

        if ((q.score || 0) !== gained) {
          q.score = gained;
          await q.save({ session });
        }

        totalScore += gained;
        maxScore += q.expectedScore || 0;
        if (gained > 0) correct++;
      }

      percent = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

      resultInterview = await Interview.findByIdAndUpdate(
        interviewId,
        { finishedAt: new Date(), score: totalScore, correct, percent },
        { new: true, session },
      );
    });
  } finally {
    session.endSession();
  }

  return { interview: resultInterview, totalScore, percent, correct };
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
