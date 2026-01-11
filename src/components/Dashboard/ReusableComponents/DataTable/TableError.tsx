import { AlertCircle } from "lucide-react";

export default function TableError({
  message = "Something went wrong",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircle className="h-10 w-10 text-red-500" />
      <h3 className="mt-4 text-lg font-semibold text-red-600">
        Failed to load data
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
