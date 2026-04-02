import { verifySession } from "@/app/lib/repositories/dal";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await verifySession();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user });
}
