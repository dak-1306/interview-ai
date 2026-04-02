import { NextResponse } from "next/server";
import { answer } from "@/app/actions/interview";

export async function POST(request: Request) {
  return answer(request);
}
