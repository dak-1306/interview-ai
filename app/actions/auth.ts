"use server";

import { registerUser, loginUser } from "@/app/lib/auth";
import { FormState, SignupFormSchema } from "@/app/lib/definitions";
import { createSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export async function registerAction(state: FormState, formData: FormData) {
  console.log("Register action called with state:", state);
  console.log("Form data entries:", Array.from(formData.entries()));
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  console.log("Validated fields:", validatedFields);
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

  console.log("User registered:", user);

  await createSession(user._id.toString());
  redirect("/dashboard");
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const user = await loginUser({ email, password });
  if (!user) throw new Error("Invalid credentials");

  await createSession(user._id.toString());
  redirect("/dashboard");
}
