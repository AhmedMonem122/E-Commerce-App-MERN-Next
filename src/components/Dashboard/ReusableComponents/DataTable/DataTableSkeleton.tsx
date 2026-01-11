import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

type SkeletonProps = {
  columns: number;
  rows?: number;
};

export default function DataTableSkeleton({
  columns,
  rows = 5,
}: SkeletonProps) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton className="h-4 w-full rounded-md" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
