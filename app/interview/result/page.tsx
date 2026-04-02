"use server";

import Link from "next/link";
import { redirect } from "next/navigation";
import { getLatestInterview, getResultById } from "@/app/actions/interview";

export default async function ResultPage({
  searchParams,
}: {
  searchParams?: { interviewId?: string };
}) {
  const interviewId = searchParams?.interviewId;
  const res = interviewId
    ? await getResultById(interviewId)
    : await getLatestInterview();
  if (!res || res.error) {
    if (res?.error === "Unauthorized") redirect("/auth/login");
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-4">No interview results</h1>
        <p className="text-sm text-gray-600 mb-6">
          You don't have any completed interviews yet.
        </p>
        <div className="flex gap-2">
          <Link
            href="/interview/start"
            className="inline-block px-4 py-2 rounded bg-blue-600 text-white"
          >
            Start Interview
          </Link>
          <Link href="/" className="inline-block px-4 py-2 rounded bg-gray-100">
            Home
          </Link>
        </div>
      </div>
    );
  }

  const latest = res.latest;

  const detail = res.detail;
  const total = detail?.questions?.length ?? 0;
  const percent = latest.percent ?? 0;
  const correct = latest.correct ?? 0;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2">Your Interview Results</h1>
      <p className="text-sm text-gray-600 mb-6">
        Summary of your latest practice
      </p>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-6xl font-extrabold">{percent}%</div>
            <div className="text-sm text-muted-foreground">
              {correct} / {total} correct
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm">Feedback</div>
            <div className="text-xs text-muted-foreground">
              {latest.percent
                ? "Well done — review the incorrect answers."
                : "No score available yet."}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <Link
            href="/"
            className="inline-block px-4 py-2 rounded bg-gray-100 dark:bg-gray-700"
          >
            Home
          </Link>
          <Link
            href="/interview/start"
            className="inline-block px-4 py-2 rounded bg-blue-600 text-white"
          >
            Start New
          </Link>
          <Link
            href="/history"
            className="inline-block px-4 py-2 rounded border ml-auto"
          >
            View History
          </Link>
        </div>
      </div>
    </div>
  );
}
