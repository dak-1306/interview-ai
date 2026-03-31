export default function Footer() {
  return (
    <footer className="w-full h-16 flex items-center justify-center bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Interview AI. All rights reserved.
      </p>
    </footer>
  );
}
