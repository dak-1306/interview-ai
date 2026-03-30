export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-4">Your Profile</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Manage your account settings, update your information, and view your
        interview practice history.
      </p>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p>Welcome to your profile page!</p>
        <p>Họ tên: John Doe</p>
        <p>Email: abc@gmail.com </p>
        <p>Ngày sinh: 01/01/1990</p>
        <p>Giới tính: Nam</p>
        <p>Địa chỉ: 123 Main St, Anytown, USA</p>
      </div>
    </div>
  );
}
