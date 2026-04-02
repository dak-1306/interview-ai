import Link from "next/link";
import { getCurrentUserAction, checkAuth } from "@/app/actions/auth";

import { Button } from "@/components/ui/button";
export default async function DashboardPage() {
  const session = await checkAuth();
  const userId = String(session.userId);
  const user = await getCurrentUserAction(userId);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">
        Your Dashboard
      </h1>
      <p className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Welcome, {user.name}!
      </p>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Here you can track your interview practice sessions, review your
        performance, and access personalized recommendations to improve your
        skills.
      </p>
      <Link href="/interview/start">
        <Button variant="default" size="lg">
          Start New Interview Session
        </Button>
      </Link>
    </div>
  );
}
