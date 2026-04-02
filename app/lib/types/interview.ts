import * as z from "zod";

export const Positions = [
  "backend",
  "frontend",
  "fullstack",
  "devops",
] as const;
export const Levels = ["intern", "fresher", "junior", "senior"] as const;

export const QuestionSchema = z.object({
  _id: z.string().optional(),
  interviewId: z.string().optional(),
  type: z.union([z.literal("mcq"), z.literal("text")]),
  level: z.enum(Levels).optional(),
  position: z.enum(Positions),
  options: z.array(z.string()).optional(),
  question: z.string().min(1),
  expectedAnswer: z.any().optional(),
  givenAnswer: z.any().optional(),
  expectedScore: z.number().int().nonnegative().default(1),
  score: z.number().int().nonnegative().default(0),
  createdAt: z.date().optional(),
});

export const InterviewSchema = z.object({
  _id: z.string().optional(),
  userId: z.string(),
  position: z.enum(Positions),
  level: z.enum(Levels),
  score: z.number().int().nonnegative().default(0),
  correct: z.number().int().nonnegative().default(0),
  percent: z.number().int().min(0).max(100).default(0),
  startedAt: z.date().optional(),
  finishedAt: z.date().optional(),
  createdAt: z.date().optional(),
});

// Forms / API inputs
export const InterviewFormSchema = z.object({
  position: z.enum(Positions),
  level: z.enum(Levels),
});

export const AnswerFormSchema = z.object({
  interviewId: z.string().min(1),
  questionId: z.string().min(1),
  answer: z.any(),
});

export const FinishFormSchema = z.object({
  interviewId: z.string().min(1),
});

export type InterviewFormState =
  | {
      errors?: {
        position?: string[];
        level?: string[];
      };
      message?: string;
    }
  | undefined;
