import { NextResponse } from "next/server";
import { history } from "@/app/actions/interview";

export async function GET() {
  return history();
}
