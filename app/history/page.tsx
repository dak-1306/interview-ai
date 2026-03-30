export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-4">Your Interview History</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        This is where you will find a history of your past interview practice
        sessions, including the questions you practiced and the feedback you
        received.
      </p>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p>Welcome to your interview history page!</p>
        <p>
          Session 1: 01/01/2024 - Practiced Data Structures - Feedback: Good
          understanding of arrays and linked lists.
        </p>
        <p>
          Session 2: 01/15/2024 - Practiced Algorithms - Feedback: Need to
          improve on sorting algorithms.
        </p>
        <p>
          Session 3: 02/01/2024 - Practiced System Design - Feedback: Strong
          design skills, but work on scalability.
        </p>
      </div>
    </div>
  );
}
