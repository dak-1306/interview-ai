import { getSession } from "./session";
import { connectDB } from "./db";
import { User } from "./models/user";

export async function verifySession() {
  const session = await getSession();
  if (!session) return null;

  await connectDB();
  const user = await User.findById(session.userId);

  return user;
}
