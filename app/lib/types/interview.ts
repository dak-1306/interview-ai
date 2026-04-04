import * as z from "zod";

/* ================================
   Constants
================================ */
export const Positions = [
  "backend",
  "frontend",
  "fullstack",
  "devops",
] as const;

export const Levels = ["intern", "fresher", "junior", "senior"] as const;

/* ================================
   Helpers
================================ */

// ObjectId: accept ObjectId or string
export const objectIdSchema = z.preprocess(
  (val) => {
    if (val && typeof val === "object") {
      try {
        if (typeof (val as any).toHexString === "function")
          return (val as any).toHexString();
        if (typeof (val as any).toString === "function")
          return (val as any).toString();
      } catch (e) {
        return val;
      }
    }
    return val;
  },
  z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
);

// Convert string → Date
export const dateSchema = z.preprocess((val) => {
  if (typeof val === "string" || val instanceof Date) {
    return new Date(val);
  }
  return val;
}, z.date());

/* ================================
   DB Schemas (MongoDB documents)
================================ */

export const QuestionSchema = z.object({
  _id: objectIdSchema.optional(),
  interviewId: objectIdSchema.optional(),

  type: z.union([z.literal("mcq"), z.literal("text")]),
  level: z.enum(Levels).optional(),
  position: z.enum(Positions),

  options: z.array(z.string()).optional(),
  question: z.string().min(1),

  expectedAnswer: z.any().optional(),
  givenAnswer: z.any().optional(),

  expectedScore: z.number().int().nonnegative().default(1),
  score: z.number().int().nonnegative().default(0),

  createdAt: dateSchema.optional(),
});

export const InterviewSchema = z.object({
  _id: objectIdSchema.optional(),
  userId: objectIdSchema,

  position: z.enum(Positions),
  level: z.enum(Levels),

  score: z.number().int().nonnegative().default(0),
  correct: z.number().int().nonnegative().default(0),
  percent: z.number().int().min(0).max(100).default(0),

  startedAt: dateSchema.optional(),
  finishedAt: dateSchema.optional(),
  createdAt: dateSchema.optional(),
  updatedAt: dateSchema.optional(),
});

/* ================================
   Client DTO Schemas (transform)
================================ */

export const QuestionClientSchema = QuestionSchema.transform((q) => ({
  id: q._id!,
  type: q.type,
  question: q.question,
  options: q.options ?? [],
  answer: q.expectedAnswer !== undefined ? String(q.expectedAnswer) : undefined,
  score: q.expectedScore,
}));

export const InterviewClientSchema = InterviewSchema.transform((i) => ({
  id: i._id!,
  position: i.position,
  level: i.level,
}));

/* ================================
   Forms / API Inputs
================================ */

export const InterviewFormSchema = z.object({
  position: z.enum(Positions),
  level: z.enum(Levels),
});

export const AnswerFormSchema = z.object({
  interviewId: z.string().min(1),
  questionId: z.string().min(1),
  answer: z.string(),
});

export const FinishFormSchema = z.object({
  interviewId: z.string().min(1),
});

/* ================================
   Types
================================ */

export type Question = z.infer<typeof QuestionSchema>;
export type Interview = z.infer<typeof InterviewSchema>;

export type QuestionClient = z.infer<typeof QuestionClientSchema>;
export type InterviewClient = z.infer<typeof InterviewClientSchema>;

export type InterviewFormState =
  | {
      errors?: {
        position?: string[];
        level?: string[];
      };
      message?: string;
    }
  | undefined;
