import Link from "next/link";
export default function Header() {
  const isLogin = true;

  return (
    <header className="w-full h-16 flex justify-between items-center px-16 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 z-10">
      <Link href="/">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Interview AI
        </h1>
      </Link>
      {isLogin && (
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
          <Link
            href="/interview/start"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Start Interview
          </Link>
        </div>
      )}
      {!isLogin && (
        <div className="flex items-center space-x-4">
          <Link href="/auth/login">
            <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300">
              Login
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
              Register
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
