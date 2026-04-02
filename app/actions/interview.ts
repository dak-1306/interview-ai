"use server";

import { verifySession } from "@/app/lib/repositories/dal";
import {
  startInterview,
  answerQuestion,
  finishInterview,
  getHistory,
  getInterviewById,
  getInterviewDetail,
} from "@/app/lib/services/interview";
import {
  InterviewFormState,
  InterviewFormSchema,
  AnswerFormSchema,
  FinishFormSchema,
} from "@/app/lib/types/interview";
import { InterviewSchema, QuestionSchema } from "@/app/lib/types/interview";

export async function start(formState: InterviewFormState, formData: FormData) {
  const user = await verifySession();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const validateFields = InterviewFormSchema.safeParse({
    position: formData.get("position"),
    level: formData.get("level"),
  });
  if (!validateFields.success) {
    return { error: "Invalid form data" };
  }

  const resp = await startInterview({
    position: validateFields.data.position,
    level: validateFields.data.level,
    userId: user._id.toString(),
  });
  return {
    interviewId: resp.interviewId,
    redirect: `/interview/practice/${resp.interviewId}`,
  };
}

export async function getInterviewDetailAction(interviewId: string) {
  const data = await getInterviewDetail(interviewId);
  if (!data || !data.interview) return { error: "Not found" };

  const interview = data.interview;
  const questions = data.questions || [];

  const vi = InterviewSchema.safeParse(interview);
  if (!vi.success) {
    console.error("Invalid interview from DB", vi.error);
    return { error: "Invalid data" };
  }

  const qDtos = [] as any[];
  for (const q of questions) {
    const vq = QuestionSchema.safeParse(q);
    if (!vq.success) {
      console.warn("Skipping invalid question", q._id?.toString());
      continue;
    }
    qDtos.push({
      id: q._id?.toString(),
      type: q.type,
      question: q.question,
      options: q.options || [],
      answer:
        q.expectedAnswer !== undefined ? String(q.expectedAnswer) : undefined,
      score: q.expectedScore,
    });
  }

  return {
    interview: {
      id: interview._id?.toString(),
      position: interview.position,
      level: interview.level,
      questions: qDtos,
    },
  };
}

export async function answer(request: Request) {
  const user = await verifySession();
  if (!user) {
    return { error: "Unauthorized" };
  }
  let payload: string;
  try {
    payload = await request.json();
  } catch (err) {
    return { error: "Invalid JSON payload" };
  }

  const validateFields = AnswerFormSchema.safeParse(payload);
  if (!validateFields.success) return { error: "Invalid form data" };

  try {
    const interviewData = await getInterviewById(
      validateFields.data.interviewId,
    );
    if (!interviewData || !interviewData.interview)
      return { error: "Not found" };
    if (String(interviewData.interview.userId) !== String(user._id))
      return { error: "Forbidden" };

    const result = await answerQuestion({
      interviewId: validateFields.data.interviewId,
      questionId: validateFields.data.questionId,
      answer: validateFields.data.answer,
    });
    return { result };
  } catch (err: any) {
    console.error(err);
    return { error: "An error occurred" };
  }
}

export async function finish(request: Request) {
  const user = await verifySession();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const payload = await request.json().catch(() => null);
  if (!payload) {
    return { error: "Invalid JSON payload" };
  }
  const validateFields = FinishFormSchema.safeParse(payload);
  if (!validateFields.success) return { error: "Invalid form data" };

  try {
    const interviewData = await getInterviewById(
      validateFields.data.interviewId,
    );
    if (!interviewData || !interviewData.interview)
      return { error: "Not found" };
    if (String(interviewData.interview.userId) !== String(user._id))
      return { error: "Forbidden" };

    const result = await finishInterview(validateFields.data.interviewId);
    return { result };
  } catch (err: any) {
    console.error(err);
    return { error: "An error occurred" };
  }
}

export async function history() {
  const user = await verifySession();
  if (!user) {
    return { error: "Unauthorized" };
  }
  const result = await getHistory(user._id.toString());
  return { result };
}

export async function getLatestInterview() {
  const user = await verifySession();
  if (!user) return { error: "Unauthorized" };

  const history = await getHistory(user._id.toString());
  const latest = history && history.length > 0 ? history[0] : null;
  if (!latest) return { latest: null, detail: null };

  const detail = await getInterviewById(latest._id.toString());
  return { latest, detail };
}

export async function getResultById(interviewId: string) {
  const user = await verifySession();
  if (!user) return { error: "Unauthorized" };

  const detail = await getInterviewById(interviewId);
  if (!detail || !detail.interview) return { error: "Not found" };
  if (String(detail.interview.userId) !== String(user._id))
    return { error: "Forbidden" };

  return { latest: detail.interview, detail };
}

export async function getById(_request: Request, params: { id: string }) {
  const user = await verifySession();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const { id } = params;
  const data = await getInterviewById(id);
  if (!data || !data.interview) return { error: "Not found" };
  if (String(data.interview.userId) !== String(user._id))
    return { error: "Forbidden" };

  const qDtos = [] as any[];
  for (const q of data.questions || []) {
    const vq = QuestionSchema.safeParse(q);
    if (!vq.success) continue;
    qDtos.push({
      id: q._id?.toString(),
      type: q.type,
      question: q.question,
      options: q.options || [],
      answer:
        q.expectedAnswer !== undefined ? String(q.expectedAnswer) : undefined,
      score: q.expectedScore,
    });
  }

  return {
    interview: {
      id: data.interview._id?.toString(),
      position: data.interview.position,
      level: data.interview.level,
      questions: qDtos,
    },
  };
}
