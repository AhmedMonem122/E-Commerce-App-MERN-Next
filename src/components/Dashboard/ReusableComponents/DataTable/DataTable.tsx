import { Table } from "@/components/ui/table";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { TableHeaderConfig, RowAction } from "@/types/data-table";
import DataTableSkeleton from "./DataTableSkeleton";

type Props<T extends { _id?: string }> = {
  headers: TableHeaderConfig<T>[];
  data: T[];
  actions?: RowAction<T>[];
  sort?: string;
  onSort?: (key: keyof T) => void;
  isLoading?: boolean;
  skeletonRows?: number;
};

export function DataTable<T extends { _id?: string }>({
  headers,
  data,
  actions,
  sort,
  onSort,
  isLoading = false,
  skeletonRows = 5,
}: Props<T>) {
  const columnsCount = headers.length + (actions ? 1 : 0);

  return (
    <div className="rounded-xl border bg-background">
      <Table>
        <DataTableHeader<T>
          headers={headers}
          sort={sort}
          onSort={onSort}
          showActions={!!actions}
        />

        {isLoading ? (
          <DataTableSkeleton columns={columnsCount} rows={skeletonRows} />
        ) : (
          <DataTableBody<T> data={data} headers={headers} actions={actions} />
        )}
      </Table>
    </div>
  );
}
