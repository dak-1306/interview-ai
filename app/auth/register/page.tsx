"use client";

import { registerAction } from "@/app/actions/auth";
import { useActionState } from "react";
export default function RegisterPage() {
  const [state, action, pending] = useActionState(registerAction, undefined);
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-4">Register for Interview AI</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Create an account to access personalized interview practice and track
        your progress.
      </p>
      <form action={action}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" placeholder="Name" />
        </div>
        {state?.errors?.name && <p>{state.errors.name}</p>}

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" placeholder="Email" />
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <button disabled={pending} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
