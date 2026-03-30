import Link from "next/link";
export default function StartPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-4">Start Your Interview Session</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Choose a topic and difficulty level to begin your personalized interview
        practice session.
      </p>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p>Welcome to your interview session!</p>
      </div>
      <Link
        href="/interview/practice"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Begin Interview
      </Link>
    </div>
  );
}
