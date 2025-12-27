import apiServer from "@/app/lib/apiServer.server";
import DashboardNavbar from "@/components/Dashboard/ReusableComponents/DashboardLayout/DashboardNavbar";
import axios from "axios";

const Navbar = async () => {
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
    <DashboardNavbar
      title={`${user?.name || "User"}'s Dashboard`}
      role="user"
      user={user}
    />
  );
};

export default Navbar;
