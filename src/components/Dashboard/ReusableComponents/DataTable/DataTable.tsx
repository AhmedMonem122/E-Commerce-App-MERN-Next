import { Table } from "@/components/ui/table";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { TableHeaderConfig, RowAction } from "@/types/data-table";

type Props<T extends { _id?: string }> = {
  headers: TableHeaderConfig<T>[];
  data: T[];
  actions?: RowAction<T>[];
  sort?: string;
  onSort?: (key: keyof T) => void;
};

export function DataTable<T extends { _id?: string }>({
  headers,
  data,
  actions,
  sort,
  onSort,
}: Props<T>) {
  return (
    <div className="rounded-xl border bg-background">
      <Table>
        <DataTableHeader<T>
          headers={headers}
          sort={sort}
          onSort={onSort}
          showActions={!!actions}
        />

        <DataTableBody<T> data={data} headers={headers} actions={actions} />
      </Table>
    </div>
  );
}
