import PracticeClient from "./PracticeClient";
import { getInterviewDetailAction } from "@/app/actions/interview";
import type {
  InterviewClient,
  QuestionClient,
} from "@/app/lib/types/interview";

export default async function PracticePage({ params }: any) {
  const resolved = await params;
  const { id } = resolved;
  const data = await getInterviewDetailAction(id);

  if (!data || !data.interview) {
    return <div>Interview not found.</div>;
  }

  const interview = data.interview as InterviewClient;
  const questions = (data.interview.questions || []) as QuestionClient[];

  return <PracticeClient interview={interview} questions={questions} />;
}
