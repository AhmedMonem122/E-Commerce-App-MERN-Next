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

export type RowAction<T> =
  | {
      icon: ReactNode;
      href: (row: T) => string;
      onClick?: never;
      render?: never;
    }
  | {
      icon: ReactNode;
      onClick: (row: T) => void;
      href?: never;
      render?: never;
    }
  | {
      render: (row: T) => ReactNode;
      icon?: never;
      href?: never;
      onClick?: never;
    };
