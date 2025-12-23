import { cookies } from "next/headers";
import apiServer from "../../lib/apiServer.server";
import ProfileCard from "@/components/Profile/ProfileCard";
import ProfileEditTabs from "@/components/ProfileEditTabs/ProfileEditTabs";

async function getUserProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const api = await apiServer();

  try {
    const res = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.data.user;
  } catch {}
}

export default async function ProfilePage() {
  const user = await getUserProfile();

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <ProfileCard user={user} />
        <ProfileEditTabs user={user} />
      </div>
    </main>
  );
}
