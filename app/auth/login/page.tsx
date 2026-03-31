export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-4">Login to Interview AI</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Please enter your credentials to access your account and start
        practicing.
      </p>
      <form className="w-full max-w-sm">
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 placeholder:text-gray-500 dark:placeholder:text-gray-400 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 placeholder:text-gray-500 dark:placeholder:text-gray-400 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-30<PASSWORD>"
        >
          Login
        </button>
      </form>
    </div>
  );
}
