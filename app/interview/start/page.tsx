"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";

import { useActionState } from "react";
import { useState, useEffect } from "react";
import { start } from "@/app/actions/interview";
import { Positions, Levels } from "@/app/lib/types/interview";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function StartPage() {
  const [state, action, pending] = useActionState(start, undefined);
  const [position, setPosition] = useState("");
  const [level, setLevel] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (state?.redirect) {
      router.push(state.redirect);
    }
  }, [state, router]);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-4">Start Your Interview Session</h1>

      <form
        action={action}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4"
      >
        <div>
          <label className="block text-sm text-left mb-2">Position</label>
          <Select value={position} onValueChange={setPosition}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose position" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Positions</SelectLabel>
                {Positions.map((pos) => (
                  <SelectItem key={pos} value={pos}>
                    {pos}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <input type="hidden" name="position" value={position} />
        </div>

        <div>
          <label className="block text-sm text-left mb-2">Level</label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Levels</SelectLabel>
                {Levels.map((lvl) => (
                  <SelectItem key={lvl} value={lvl}>
                    {lvl}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <input type="hidden" name="level" value={level} />
        </div>

        {state?.error && (
          <p className="text-left text-red-500">{state.error}</p>
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={!position || !level || pending}>
            Begin Interview
          </Button>
        </div>
      </form>
    </div>
  );
}
