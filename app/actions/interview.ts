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

export async function start(formState: InterviewFormState, formData: FormData) {
  const user = await verifySession();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const validateFields = InterviewFormSchema.safeParse({
    position: formData.get("position"),
    level: formData.get("level"),
  });
  console.log("validateFields", validateFields);
  if (!validateFields.success) {
    return { error: "Invalid form data" };
  }

  const resp = await startInterview({
    position: validateFields.data.position,
    level: validateFields.data.level,
    userId: user._id.toString(),
  });
  console.log("startInterview response", resp);
  return {
    interviewId: resp.interviewId,
    redirect: `/interview/practice/${resp.interviewId}`,
  };
}

export async function getInterviewDetailAction(interviewId: string) {
  return await getInterviewDetail(interviewId);
}

export async function answer(request: Request) {
  const user = await verifySession();
  if (!user) {
    return { error: "Unauthorized" };
  }
  const payload = await request.json();
  const validateFields = AnswerFormSchema.safeParse(payload);

  if (!validateFields.success) {
    return { error: "Invalid form data" };
  }

  try {
    const result = await answerQuestion({
      interviewId: validateFields.data.interviewId,
      questionId: validateFields.data.questionId,
      answer: validateFields.data.answer,
    });
    return { result };
  } catch (err: any) {
    return { error: err.message || "An error occurred" };
  }
}

export async function finish(request: Request) {
  const user = await verifySession();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const payload = await request.json();
  const validateFields = FinishFormSchema.safeParse(payload);
  if (!validateFields.success) {
    return { error: "Invalid form data" };
  }
  const result = await finishInterview(validateFields.data.interviewId);
  return { result };
}

export async function history() {
  const user = await verifySession();
  if (!user) {
    return { error: "Unauthorized" };
  }
  const result = await getHistory(user._id.toString());
  return { result };
}

export async function getById(_request: Request, params: { id: string }) {
  const user = await verifySession();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const { id } = params;
  const result = await getInterviewById(id);
  if (!result) return { error: "Not found" };
  return { result };
}
