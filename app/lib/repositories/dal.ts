import { getSession } from "../services/session";
import { connectDB } from "../db/db";
import { User } from "../models/user";

export async function verifySession() {
  const session = await getSession();
  if (!session) return null;

  await connectDB();
  const user = await User.findById(session.userId);

  return user;
}
