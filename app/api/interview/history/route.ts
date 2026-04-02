import { NextResponse } from "next/server";
import { history } from "@/app/actions/interview";

export async function GET() {
  const result = await history();
  if (!result)
    return NextResponse.json({ error: "No response" }, { status: 500 });
  if ((result as any).error) {
    const err = String((result as any).error);
    const status = err === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: err }, { status });
  }
  return NextResponse.json(result);
}
