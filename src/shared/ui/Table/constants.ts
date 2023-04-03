import { UseFormWatch, UseFormReset } from "react-hook-form";
import { IPaginated } from "store/interfaces/main";

export interface IPaginationInfo {
  limit: number;
  page: number;
  startDate?: string;
  endDate?: string;
}

export interface IColumn {
  label: string;
  layout?: (row: any) => JSX.Element;
  field?: string;
}

export interface IFilterOptions {
  watch: UseFormWatch<any>;
  reset: UseFormReset<any>;
}

export interface IEnhancedToolbar {
  onExport?: () => void;
  rowsSelected: number;
  filterOptions: IFilterOptions;
  fetchData: () => void;
  hasFilters: boolean;
  hasSearchInput: boolean;
  handleToggleFilter: () => void;
  hasCustomActions?: boolean;
}

export interface IAction<T> {
  label: string;
  onClick: (row: T) => any;
}

export interface ITableProps<T> {
  columns: IColumn[];
  toolbar?: boolean;
  data?: T[];
  sortable?: boolean;
  paginatedData?: IPaginated<T>;
  Filter?: () => JSX.Element;
  onChange?: () => void;
  onExport?: (arr?: number[]) => void;
  onChangeSelected?: (list: number[]) => void;
  selectable?: boolean;
  getActions?: (row: T) => IAction<T>[];
  enablePagination?: boolean;
  filterOptions?: IFilterOptions;
  section?: string;
  hasSearchInput?: boolean;
  hasCustomActions?: boolean;
  CustomActions?: () => JSX.Element;
}

export const rowsPerPageOptions = [5, 10, 20];
