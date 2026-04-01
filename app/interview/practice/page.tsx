"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { sampleQuestions, questionResult } from "@/app/lib/data/question";
type result = questionResult;
export default function PracticePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const position = searchParams.get("position") || "";
  const level = searchParams.get("level") || "";

  const [index, setIndex] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, string>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [openSubmit, setOpenSubmit] = useState(false);
  const [formResult, setFormResult] = useState<result[] | null>(null);
  const filterQuestion = sampleQuestions.filter(
    (q) => q.position === position && q.level === level,
  );
  const current = filterQuestion[index];

  function handleNext() {
    if (!current) return;
    // basic validation: require answer for current question
    if (current.type === "mcq" && !mcqAnswers[current.id]) return;
    if (current.type === "text" && !textAnswers[current.id]) return;

    if (index + 1 >= filterQuestion.length) {
      const results: result[] = filterQuestion.map((q) => {
        if (q.type === "mcq") {
          const userAnswer = mcqAnswers[q.id];
          const correct = userAnswer === q.answer;
          return {
            questionId: q.id,
            answer: userAnswer || "",
            score: correct ? q.score || 0 : 0,
          };
        } else {
          return {
            questionId: q.id,
            answer: textAnswers[q.id] || "",
            score: q.score || 0,
          };
        }
      });
      setFormResult(results);

      setOpenSubmit(true);
    } else {
      setIndex((s) => s + 1);
    }
  }

  function handleSubmit() {
    setOpenSubmit(false);
    // Here you would send answers to backend. For now navigate to result page.
    router.push("/interview/result");
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2">
        Your Interview Practice Session
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        {position} — {level}
      </p>

      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {current ? (
          <div className="space-y-4">
            <div className="text-lg font-medium">{current.question}</div>

            {current.type === "mcq" && (
              <RadioGroup
                value={mcqAnswers[current.id] || ""}
                onValueChange={(v) =>
                  setMcqAnswers((s) => ({ ...s, [current.id]: v }))
                }
              >
                <div className="grid gap-2">
                  {current.options?.map((opt, i) => (
                    <label key={i} className="flex items-center gap-3">
                      <RadioGroupItem value={String(i)} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </RadioGroup>
            )}

            {current.type === "text" && (
              <Textarea
                value={textAnswers[current.id] || ""}
                onChange={(e) =>
                  setTextAnswers((s) => ({
                    ...s,
                    [current.id]: e.target.value,
                  }))
                }
                placeholder="Type your answer here..."
              />
            )}

            <div className="flex justify-end">
              <Button onClick={handleNext}>Next</Button>
            </div>
          </div>
        ) : (
          <div>No questions available.</div>
        )}
      </div>

      <Dialog open={openSubmit} onOpenChange={setOpenSubmit}>
        <DialogContent>
          <DialogTitle>Submit your answers</DialogTitle>
          <DialogDescription>
            You are about to submit your answers. Review then confirm to finish.
          </DialogDescription>

          <div className="mt-4 space-y-2">
            {filterQuestion.map((q) => (
              <div key={q.id} className="text-sm">
                <div className="font-medium">{q.question}</div>
                <div className="text-muted-foreground">
                  {q.type === "mcq"
                    ? mcqAnswers[q.id] !== undefined
                      ? q.options?.[Number(mcqAnswers[q.id])]
                      : "(no answer)"
                    : textAnswers[q.id] || "(no answer)"}
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpenSubmit(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
