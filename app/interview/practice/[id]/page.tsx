import PracticeClient from "./PracticeClient";
import { getInterviewDetailAction } from "@/app/actions/interview";

export default async function PracticePage({ params }: any) {
  const resolved = await params;
  const { id } = resolved;
  const data = await getInterviewDetailAction(id);
  const interview = data.interview;
  const questions = data.interview?.questions || [];

  const interviewProp = {
    id: interview?.id?.toString() || id,
    position: interview?.position || undefined,
    level: interview?.level || undefined,
    questions: questions.map((q: any) => ({
      id: q.id?.toString(),
      type: q.type,
      question: q.question,
      options: q.options || [],
      answer: q.answer,
      score: q.score,
    })),
  };

  return <PracticeClient interview={interviewProp} />;
}
