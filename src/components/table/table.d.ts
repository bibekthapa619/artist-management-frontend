import type { PaginationData } from "@/types/api/common";

export interface TableProps<T> {
  headers: TableHeaderType[];
  rows: T[];
  options?: TableOption[];
  paginationData?: PaginationData;
}

export interface TableHeaderType {
  title: string;
  key: string;
}

export interface TableOption {
  title: string;
  action: (actionArg: any) => void;
  isDanger?: boolean;
}
