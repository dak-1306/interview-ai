import { NextResponse } from "next/server";
import { getById } from "@/app/actions/interview";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  return getById(request, params);
}
