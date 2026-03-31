"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full h-16 flex justify-between items-center px-16 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 z-10">
      <Link href="/">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Interview AI
        </h1>
      </Link>
      {pathname === "/auth/login" || pathname === "/auth/register" ? (
        <></>
      ) : pathname === "/dashboard" ||
        pathname === "/profile" ||
        pathname === "/interview/start" ? (
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className=" text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
          >
            Dashboard
          </Link>
          <Link
            href="/profile"
            className=" text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
          >
            Profile
          </Link>
          <Link href="/interview/start">
            <Button variant="link" size="sm">
              Start Interview
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Link href="/auth/login">
            <Button
              variant="outline"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
            >
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button
              variant="default"
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
            >
              Register
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
