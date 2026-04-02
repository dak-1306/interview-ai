import Link from "next/link";
import { redirect } from "next/navigation";
import { getResultById } from "@/app/actions/interview";

export default async function HistoryDetailPage({ params }: any) {
  const { id } = await params;
  const res = await getResultById(id);
  if (!res || res.error) {
    if (res?.error === "Unauthorized") redirect("/auth/login");
    return (
      <div>
        <h1>History Detail</h1>
        <p>Not found.</p>
      </div>
    );
  }

  const interview = res.latest as any;
  const detail = res.detail as any;
  const total = detail?.questions?.length ?? 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Interview Result</h1>
        <div className="text-sm text-muted-foreground">
          {interview.position} — {interview.level}
        </div>
        <div className="mt-2">
          <strong>{interview.percent ?? 0}%</strong> — {interview.correct ?? 0}{" "}
          / {total} correct
        </div>
      </div>

      <div className="space-y-4">
        {(detail.questions || []).map((q: any, idx: number) => (
          <div key={q._id?.toString() || idx} className="p-4 border rounded">
            <div className="font-medium">{q.question}</div>
            {q.type === "mcq" && (
              <div className="text-sm mt-2">
                Options: {(q.options || []).join(", ")}
              </div>
            )}
            <div className="mt-2 text-sm">
              <div>Given answer: {q.givenAnswer ?? "(no answer)"}</div>
              <div>Expected answer: {q.expectedAnswer ?? "(n/a)"}</div>
              <div>Score: {q.score ?? 0}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link
          href="/history"
          className="inline-block px-4 py-2 rounded bg-gray-100"
        >
          Back to history
        </Link>
      </div>
    </div>
  );
}
