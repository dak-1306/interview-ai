import Link from "next/link";
export default function ResultPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-4">Your Interview Results</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        This is where you will find the results of your interview practice
        session.
      </p>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p>Your results are ready!</p>
      </div>
      <Link
        href="/history"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        View History
      </Link>
    </div>
  );
}
