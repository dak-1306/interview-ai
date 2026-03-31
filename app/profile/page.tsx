import { CardHeader, CardTitle, Card, CardContent } from "@/components/ui/card";
import { getCurrentUserAction } from "@/app/actions/auth";
import { checkAuth } from "@/app/actions/auth";
export default async function ProfilePage() {
  const session = await checkAuth();
  const userId = String(session.userId);
  const user = await getCurrentUserAction(userId);

  return (
    <Card className="max-w-md mx-auto mt-10">
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
  );
}
