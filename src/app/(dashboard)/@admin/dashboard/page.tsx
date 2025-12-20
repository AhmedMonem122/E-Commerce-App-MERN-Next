import DashboardLayout from "@/components/Dashboard/ReusableComponents/DashboardLayout/DashboardLayout";

export default function AdminDashboardPage() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Welcome Admin 👋</h2>
        <p className="text-muted-foreground">
          Manage products, users, and platform content.
        </p>
      </div>
    </DashboardLayout>
  );
}
