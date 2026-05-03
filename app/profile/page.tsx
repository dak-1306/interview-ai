import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CardHeader,
  CardTitle,
  Card,
  CardContent,
  CardAction,
} from "@/components/ui/card";

import { getCurrentUserAction, logoutAction } from "@/app/actions/auth";

import HistoryPage from "../history/page";

export default async function ProfilePage() {
  const user = await getCurrentUserAction();

  return (
    <div className="space-y-4">
      <Card className="max-w-3xl min-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>

          <CardAction>
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <p>Họ tên: {user.name}</p>
          <p>Email: {user.email}</p>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4">
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>

        <form action={logoutAction}>
          <Button variant="destructive">Logout</Button>
        </form>
      </div>

      <HistoryPage />
    </div>
  );
}
