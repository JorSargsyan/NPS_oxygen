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

export const rowsPerPageOptions = [5, 10, 20];
