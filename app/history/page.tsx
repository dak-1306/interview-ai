import {
  Item,
  ItemTitle,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
} from "@/components/ui/item";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import { history } from "@/app/actions/interview";

export default async function HistoryPage() {
  const res = await history();
  if (!res || res.error) {
    if (res?.error === "Unauthorized") redirect("/auth/login");
    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-3">Recent Sessions</h2>
        <Card>
          <div className="p-6">No sessions found.</div>
        </Card>
      </div>
    );
  }

  const list = res.result || [];

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-3">Recent Sessions</h2>
      <Card>
        <ItemGroup>
          {list.map((h: any, idx: number) => {
            const id = h._id?.toString() || h.id;
            const date = new Date(
              h.finishedAt || h.startedAt || Date.now(),
            ).toLocaleString();
            const scoreText =
              h.percent !== undefined
                ? `Score: ${h.percent}%`
                : h.score !== undefined
                  ? `Score: ${h.score}`
                  : "No score";
            return (
              <Link href={`/history/${id}`} key={id}>
                <div>
                  <Item className="p-4">
                    <ItemTitle>{`${h.position || "Session"} — ${h.level || "Practice"}`}</ItemTitle>
                    <ItemDescription>{`${date} — ${scoreText}`}</ItemDescription>
                  </Item>
                  {idx < list.length - 1 && <ItemSeparator />}
                </div>
              </Link>
            );
          })}
        </ItemGroup>
      </Card>
    </div>
  );
}
