"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import type { InterviewClient, QuestionClient } from "@/app/lib/types/interview";

type Props = {
  interview: InterviewClient;
  questions: QuestionClient[];
};

type Result = {
  questionId: string;
  answer: string;
  score: number;
};

export default function PracticeClient({ interview, questions }: Props) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, string>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [savingMap, setSavingMap] = useState<Record<string, boolean>>({});

  const [openSubmit, setOpenSubmit] = useState(false);
  const [formResult, setFormResult] = useState<Result[] | null>(null);
  
  const current = questions[index];

  async function handleNext() {
    if (!current) return;
    if (current.type === "mcq" && !mcqAnswers[current.id]) return;
    if (current.type === "text" && !textAnswers[current.id]) return;

    // save current answer when Next is clicked
    const answer =
      current.type === "mcq"
        ? mcqAnswers[current.id] || ""
        : textAnswers[current.id] || "";
    await saveAnswer(current.id, answer);

    if (index + 1 >= questions.length) {
      const results: Result[] = questions.map((q) => {
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

  async function handleSubmit() {
    setOpenSubmit(false);
    try {
      const res = await fetch("/api/interview/finish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interviewId: interview.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Finish failed");
      const finishedId =
        data?.result?.interview?._id ||
        data?.result?.interview?.id ||
        interview.id;
      router.push(`/interview/result?interviewId=${finishedId}`);
    } catch (err) {
      console.error(err);
      // on error, show simple alert for now
      alert("Failed to finish interview. Please try again.");
    }
  }

  async function saveAnswer(questionId: string, answer: string) {
    setSavingMap((s) => ({ ...s, [questionId]: true }));
    try {
      const res = await fetch("/api/interview/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interviewId: interview.id, questionId, answer }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
    } catch (err) {
      console.error(err);
    } finally {
      setSavingMap((s) => ({ ...s, [questionId]: false }));
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2">
        Your Interview Practice Session
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        {interview.position} — {interview.level}
      </p>

      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {current ? (
          <div className="space-y-4">
            <div className="text-lg font-medium">{current.question}</div>

            {current.type === "mcq" && (
              <RadioGroup
                value={mcqAnswers[current.id] || ""}
                onValueChange={(v) => {
                  setMcqAnswers((s) => ({ ...s, [current.id]: v }));
                }}
              >
                <div className="grid gap-2">
                  {current.options?.map((opt, i) => (
                    <label key={i} className="flex items-center gap-3">
                      <RadioGroupItem value={opt} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </RadioGroup>
            )}

            {current.type === "text" && (
              <Textarea
                value={textAnswers[current.id] || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setTextAnswers((s) => ({ ...s, [current.id]: val }));
                }}
                placeholder="Type your answer here..."
              />
            )}

            <div className="flex items-center justify-end gap-4">
              {savingMap[current.id] && (
                <div className="text-sm text-gray-500">Saving...</div>
              )}
              <Button onClick={handleNext} disabled={!!savingMap[current.id]}>
                Next
              </Button>
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
            {questions.map((q) => (
              <div key={q.id} className="text-sm">
                <div className="font-medium">{q.question}</div>
                <div className="text-muted-foreground">
                  {q.type === "mcq"
                    ? mcqAnswers[q.id]
                      ? mcqAnswers[q.id]
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
