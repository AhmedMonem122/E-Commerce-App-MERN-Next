import { ReactNode } from "react";

// types/data-table.ts
import { ReactNode } from "react";

export type TableHeaderConfig<T> =
  | {
      label: string;
      sortable: true;
      key: keyof T;
      render?: never;
    }
  | {
      label: string;
      sortable?: false;
      key: keyof T;
      render?: never;
    }
  | {
      label: string;
      sortable?: false;
      key?: never;
      render: (row: T) => ReactNode;
    };

export type RowAction<T> = {
  label?: string;
  icon: ReactNode;
  onClick?: (row: T) => void;
  href?: (row: T) => string;
};
