"use client";

import { loginAction } from "@/app/actions/auth";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardAction } from "@/components/ui/card";
export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, undefined);
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">
        Log in to Interview AI
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Sign in to access your personalized interview practice and track your
        progress.
      </p>
      <Card className="w-full max-w-md p-6">
        <CardAction className="mb-4 text-left">
          Dont have an account?{" "}
          <a
            href="/auth/register"
            className="text-violet-600 dark:text-violet-400 font-medium hover:underline"
          >
            Sign up here
          </a>
        </CardAction>
        <form
          className="w-full max-w-md space-y-4 flex flex-col "
          action={action}
        >
          <div className="flex flex-col items-start justify-start">
            <label htmlFor="email">Email</label>
            <Input id="email" name="email" placeholder="Email" />
          </div>
          {state?.errors?.email && (
            <p className="text-left text-red-500">{state.errors.email}</p>
          )}

          <div className="flex flex-col items-start justify-start">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
          {state?.errors?.password && (
            <div className="text-left text-red-500 bg-white dark:bg-gray-800 p-4 rounded">
              <p>Password must:</p>
              <ul className="list-disc list-inside">
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
          <Button variant="default" size="lg" disabled={pending} type="submit">
            Log In
          </Button>
        </form>
      </Card>
    </div>
  );
}
