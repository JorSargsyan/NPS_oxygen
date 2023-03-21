import { UseFormWatch, UseFormReset } from "react-hook-form";

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
  rowsSelected: number;
  filterOptions: IFilterOptions;
  fetchData: () => void;
  hasSearchInput: boolean;
}

export const rowsPerPageOptions = [5, 10, 20];
