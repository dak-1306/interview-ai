import bcrypt from "bcrypt";
import { connectDB } from "../db/db";
import { User } from "../models/user";

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

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    name,
  });
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

export async function getCurrentUser(userId: string) {
  await connectDB();

  const user = await User.findById(userId);
  if (!user) return null;

  return user;
}
