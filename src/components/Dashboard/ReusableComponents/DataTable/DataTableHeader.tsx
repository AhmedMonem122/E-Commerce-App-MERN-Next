import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { TableHeaderConfig } from "@/types/data-table";

type Props<T> = {
  headers: TableHeaderConfig<T>[];
  sort?: string;
  onSort?: (key: keyof T) => void;
  showActions?: boolean;
};

export function DataTableHeader<T>({
  headers,
  // sort,
  onSort,
  showActions,
}: Props<T>) {
  return (
    <TableHeader>
      <TableRow>
        {headers.map((header) => (
          <TableHead key={header.label}>
            {header.sortable && onSort ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSort(header.key)} // ✅ key is guaranteed
                className="flex items-center gap-1"
              >
                {header.label}
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            ) : (
              header.label
            )}
          </TableHead>
        ))}

        {showActions && <TableHead className="text-right">Actions</TableHead>}
      </TableRow>
    </TableHeader>
  );
}
