import { NextResponse } from "next/server";
import { getById } from "@/app/actions/interview";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const result = await getById(request, params);
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
