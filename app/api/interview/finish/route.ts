import { NextResponse } from "next/server";
import { finish } from "@/app/actions/interview";

export async function POST(request: Request) {
  const result = await finish(request);
  if (!result)
    return NextResponse.json({ error: "No response" }, { status: 500 });
  if (result.error) {
    const err = String(result.error);
    const status =
      err === "Unauthorized"
        ? 401
        : err === "Forbidden"
          ? 403
          : err === "Not found"
            ? 404
            : 400;
    return NextResponse.json({ error: err }, { status });
  }
  return NextResponse.json(result);
}
