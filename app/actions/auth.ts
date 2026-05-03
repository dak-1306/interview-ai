"use server";

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "@/app/lib/services/auth";
import {
  FormState,
  SignupFormSchema,
  LoginFormSchema,
} from "@/app/lib/types/definitions";
import {
  createSession,
  getSession,
  deleteSession,
} from "@/app/lib/services/session";
import { redirect } from "next/navigation";

export async function registerAction(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await registerUser({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    name: validatedFields.data.name,
  });
  await createSession(user._id.toString());
  redirect("/dashboard");
}

export async function loginAction(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await loginUser({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });
  if (!user) throw new Error("Invalid credentials");

  await createSession(user._id.toString());
  redirect("/dashboard");
}

export async function checkAuth() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }
  return session;
}

export async function getCurrentUserAction() {
  const session = await checkAuth();
  const userId = String(session.userId);
  const user = await getCurrentUser(userId);
  if (!user) {
    redirect("/auth/login");
  }
  return user;
}

export async function logoutAction() {
  const session = await getSession();
  if (session) {
    await deleteSession();
  }
  redirect("/auth/login");
}
