import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RowAction, TableHeaderConfig } from "@/types/data-table";

type Props<T extends { _id?: string }> = {
  data: T[];
  headers: TableHeaderConfig<T>[];
  actions?: RowAction<T>[];
};

export function DataTableBody<T extends { _id?: string }>({
  data,
  headers,
  actions,
}: Props<T>) {
  return (
    <TableBody>
      {data.map((row, index) => (
        <TableRow key={row._id ?? index}>
          {headers.map((header, i) => (
            <TableCell key={i}>
              {header.render
                ? header.render(row)
                : header.key
                ? String(row[header.key] ?? "")
                : null}
            </TableCell>
          ))}

          {actions && (
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                {actions.map((action, i) => {
                  if (action.render) {
                    return <div key={i}>{action.render(row)}</div>;
                  }

                  if (action.href) {
                    return (
                      <Link key={i} href={action.href(row)}>
                        <Button size="icon" variant="ghost">
                          {action.icon}
                        </Button>
                      </Link>
                    );
                  }

                  return (
                    <Button
                      key={i}
                      size="icon"
                      variant="ghost"
                      onClick={() => action.onClick(row)}
                    >
                      {action.icon}
                    </Button>
                  );
                })}
              </div>
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
}
