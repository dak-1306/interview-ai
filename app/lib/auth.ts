import bcrypt from "bcrypt";
import { connectDB } from "./db";
import { User } from "./models/user";

export async function registerUser({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  await connectDB();

  console.log("Data registerUser received:", { email, password, name });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    name,
  });
  console.log("User created:", user);
  return user;
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  await connectDB();

  const user = await User.findOne({ email });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return user;
}
