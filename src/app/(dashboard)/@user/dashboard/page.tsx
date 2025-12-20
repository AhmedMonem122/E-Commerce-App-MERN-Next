import DashboardLayout from "@/components/Dashboard/ReusableComponents/DashboardLayout/DashboardLayout";

export default function UserDashboardPage() {
  return (
    <DashboardLayout role="user" userName="Ahmed">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Welcome back, Ahmed 👋</h2>
        <p className="text-muted-foreground">
          Track orders, reviews, and products.
        </p>
      </div>
    </DashboardLayout>
  );
}
