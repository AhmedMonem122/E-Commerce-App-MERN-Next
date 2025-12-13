import { cookies } from "next/headers";
import apiServer from "../lib/apiServer.server";
import ProfileCard from "@/components/Profile/ProfileCard";
import { User } from "@/types/user";

async function getUserProfile(): Promise<User> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const api = await apiServer();

  const res = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data.user;
}

export default async function ProfilePage() {
  const user = await getUserProfile();

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <ProfileCard user={user} />
      </div>
    </main>
  );
}
