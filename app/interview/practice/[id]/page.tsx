import PracticeClient from "./PracticeClient";
import { getInterviewDetailAction } from "@/app/actions/interview";

export default async function PracticePage({ params }: any) {
  const { id } = await params;
  console.log("PracticePage params", params);

  const data = await getInterviewDetailAction(id);
  const interview = data.interview;
  const questions = data.questions || [];

  const interviewProp = {
    id: interview?._id?.toString() || id,
    position: interview?.position || undefined,
    level: interview?.level || undefined,
    questions: questions.map((q: any) => ({
      id: q._id?.toString(),
      type: q.type,
      question: q.question,
      options: q.options || [],
      answer: q.expectedAnswer,
      score: q.expectedScore,
    })),
  };
  console.log("interviewProp", interviewProp);

  return <PracticeClient interview={interviewProp} />;
}
