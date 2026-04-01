import Link from "next/link";

const mockScore = {
  percent: 82,
  correct: 9,
  total: 11,
};

export default function ResultPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2">Your Interview Results</h1>
      <p className="text-sm text-gray-600 mb-6">
        Summary of your latest practice
      </p>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-6xl font-extrabold">{mockScore.percent}%</div>
            <div className="text-sm text-muted-foreground">
              {mockScore.correct} / {mockScore.total} correct
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm">Mock feedback</div>
            <div className="text-xs text-muted-foreground">
              Good overall. Review text answers for clarity.
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
