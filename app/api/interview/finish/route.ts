import { NextResponse } from "next/server";
import { finish } from "@/app/actions/interview";

export async function POST(request: Request) {
  return finish(request);
}
