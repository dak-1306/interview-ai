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
  InterviewClientSchema,
  QuestionClientSchema,
} from "@/app/lib/types/interview";

/* ================================
   Start Interview
================================ */
export async function start(formState: InterviewFormState, formData: FormData) {
  const user = await verifySession();
  if (!user) return { error: "Unauthorized" };

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

/* ================================
   Get Interview Detail
================================ */
export async function getInterviewDetailAction(interviewId: string) {
  const data = await getInterviewDetail(interviewId);
  if (!data || !data.interview) return { error: "Not found" };

  const vi = InterviewClientSchema.safeParse(data.interview);
  if (!vi.success) {
    console.error("Invalid interview", vi.error);
    return { error: "Invalid data" };
  }

  const questions =
    (data.questions || [])
      .map((q: any) => QuestionClientSchema.safeParse(q))
      .filter((r: any) => r.success)
      .map((r: any) => r.data) || [];

  return {
    interview: {
      ...vi.data,
      questions,
    },
  };
}

/* ================================
   Answer Question
================================ */
export async function answer(request: Request) {
  const user = await verifySession();
  if (!user) return { error: "Unauthorized" };

  const payload = await request.json().catch(() => null);
  if (!payload) return { error: "Invalid JSON payload" };

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
  } catch (err) {
    console.error(err);
    return { error: "An error occurred" };
  }
}

/* ================================
   Finish Interview
================================ */
export async function finish(request: Request) {
  const user = await verifySession();
  if (!user) return { error: "Unauthorized" };

  const payload = await request.json().catch(() => null);
  if (!payload) return { error: "Invalid JSON payload" };

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
  } catch (err) {
    console.error(err);
    return { error: "An error occurred" };
  }
}

/* ================================
   History
================================ */
export async function history() {
  const user = await verifySession();
  if (!user) return { error: "Unauthorized" };

  const result = await getHistory(user._id.toString());
  return { result };
}

/* ================================
   Latest Interview
================================ */
export async function getLatestInterview() {
  const user = await verifySession();
  if (!user) return { error: "Unauthorized" };

  const history = await getHistory(user._id.toString());
  const latest = history && history.length > 0 ? history[0] : null;
  if (!latest) return { latest: null, detail: null };

  const detail = await getInterviewById(latest._id.toString());
  return { latest, detail };
}

/* ================================
   Result By Id
================================ */
export async function getResultById(interviewId: string) {
  const user = await verifySession();
  if (!user) return { error: "Unauthorized" };

  const detail = await getInterviewById(interviewId);
  if (!detail || !detail.interview) return { error: "Not found" };

  if (String(detail.interview.userId) !== String(user._id))
    return { error: "Forbidden" };

  return { latest: detail.interview, detail };
}
