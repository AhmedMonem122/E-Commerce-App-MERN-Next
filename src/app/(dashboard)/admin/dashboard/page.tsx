import apiServer from "@/app/lib/apiServer.server";
import axios from "axios";

const AdminDashboardPage = async () => {
  let user = null;
  try {
    const api = await apiServer();
    const res = await api.get("/users/me"); // adjust if your endpoint differs
    user = res.data?.data?.user ?? null;
  } catch (axiosError) {
    if (axios.isAxiosError(axiosError)) {
      // not authenticated or error -> user stays null
      user = null;
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">
        Welcome {user?.name || "Admin"} 👋
      </h2>
      <p className="text-muted-foreground">
        Manage products, users, and platform content.
      </p>
    </div>
  );
};

export default AdminDashboardPage;
