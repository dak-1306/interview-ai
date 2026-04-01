import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardHeader, CardTitle, Card, CardContent } from "@/components/ui/card";
import { getCurrentUserAction } from "@/app/actions/auth";
import { checkAuth } from "@/app/actions/auth";
export default async function ProfilePage() {
  const session = await checkAuth();
  const userId = String(session.userId);
  const user = await getCurrentUserAction(userId);

  return (
    <div className="space-y-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        {user ? (
          <CardContent>
            <p>Họ tên: {user.name}</p>
            <p>Email: {user.email}</p>
          </CardContent>
        ) : (
          <CardContent>
            <p>Không thể tải thông tin người dùng.</p>
          </CardContent>
        )}
      </Card>
      <div className="flex justify-center space-x-4">
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
        <Link href="/history">
          <Button variant="outline">View History</Button>
        </Link>
      </div>
    </div>
  );
}
