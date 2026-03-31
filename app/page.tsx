import Link from "next/link";
import { Button } from "@/components/ui/button";
import { checkAuth } from "@/app/actions/auth";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await checkAuth();
  console.log("Session on home page:", session);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">
        Welcome to Interview AI
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        An AI-powered interview preparation tool that helps you practice and
        improve your interview skills.
      </p>
      <Link href="/dashboard">
        <Button variant="default" size="lg">
          Get Started
        </Button>
      </Link>
    </div>
  );
}
