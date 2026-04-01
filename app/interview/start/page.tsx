"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
const positions = [
  { value: "backend", label: "Backend" },
  { value: "frontend", label: "Frontend" },
  { value: "fullstack", label: "Fullstack" },
  { value: "devops", label: "DevOps" },
];

const levels = [
  { value: "intern", label: "Intern" },
  { value: "fresher", label: "Fresher" },
  { value: "junior", label: "Junior" },
  { value: "senior", label: "Senior" },
];

export default function StartPage() {
  const router = useRouter();
  const [position, setPosition] = useState("");
  const [level, setLevel] = useState("");

  function begin() {
    if (!position || !level) return;
    router.push(
      `/interview/practice?position=${encodeURIComponent(
        position,
      )}&level=${encodeURIComponent(level)}`,
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-4">Start Your Interview Session</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Choose a topic and difficulty level to begin your personalized interview
        practice session.
      </p>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
        <div>
          <label className="block text-sm text-left mb-2">Position</label>
          <Select value={position} onValueChange={setPosition}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose position" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Positions</SelectLabel>
                {positions.map((pos) => (
                  <SelectItem key={pos.value} value={pos.value}>
                    {pos.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
                {levels.map((lvl) => (
                  <SelectItem key={lvl.value} value={lvl.value}>
                    {lvl.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          <Button onClick={begin} disabled={!position || !level}>
            Begin Interview
          </Button>
        </div>
      </div>
    </div>
  );
}
