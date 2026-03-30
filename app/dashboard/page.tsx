import Link from "next/link";
export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-4">Your Dashboard</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Here you can track your interview practice sessions, review your
        performance, and access personalized recommendations to improve your
        skills.
      </p>
      <Link
        href="/interview/start"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Start a New Interview Session
      </Link>
    </div>
  );
}
