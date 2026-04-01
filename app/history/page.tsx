import {
  Item,
  ItemTitle,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
} from "@/components/ui/item";
import { Card } from "@/components/ui/card";
const mockHistory = [
  { id: "s1", title: "Session — Arrays", desc: "2026-03-20 — Score: 78%" },
  { id: "s2", title: "Session — GraphQL", desc: "2026-03-10 — Score: 85%" },
  {
    id: "s3",
    title: "Session — System Design",
    desc: "2026-02-28 — Score: 92%",
  },
];
export default function HistoryPage() {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-3">Recent Sessions</h2>
      <Card>
        <ItemGroup>
          {mockHistory.map((h, idx) => (
            <div key={h.id}>
              <Item className="p-4">
                <ItemTitle>{h.title}</ItemTitle>
                <ItemDescription>{h.desc}</ItemDescription>
              </Item>
              {idx < mockHistory.length - 1 && <ItemSeparator />}
            </div>
          ))}
        </ItemGroup>
      </Card>
    </div>
  );
}
