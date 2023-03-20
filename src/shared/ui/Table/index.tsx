import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  Box,
  IconButton,
} from "@mui/material";
import { useMemo, useCallback } from "react";
import { UseFormReset, UseFormWatch } from "react-hook-form";
import { IPaginated } from "store/interfaces/main";
import { IColumn, rowsPerPageOptions } from "./constants";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import DotsMenu from "../DotsMenu";
import { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions";
import useGetUserPermissionsList from "shared/helpers/hooks/usePermissionList";
import { hasOtherPermissionButGet } from "shared/helpers";
export interface IAction<T> {
  label: string;
  onClick: (row: T) => any;
}

export interface ITableProps<T> {
  columns: IColumn[];
  data?: T[];
  paginatedData?: IPaginated<T>;
  onChange?: () => void;
  getActions?: (row: T) => IAction<T>[];
  enablePagination?: boolean;
  filterOptions?: {
    watch: UseFormWatch<any>;
    reset: UseFormReset<any>;
  };
  section: string;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {<FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </Box>
  );
}

const BasicTable = <T extends unknown>({
  columns,
  data,
  paginatedData,
  onChange,
  getActions,
  filterOptions,
  enablePagination = true,
  section,
}: ITableProps<T>): JSX.Element => {
  const filters = filterOptions?.watch();
  const permList = useGetUserPermissionsList();

  const handleRowsPerPageChange = (e: any) => {
    const value = e.target.value;
    filterOptions?.reset({
      ...filters,
      limit: value,
    });
    onChange?.();
  };

  const handleClickAction = useCallback((action: IAction<T>, row: T) => {
    action.onClick(row);
  }, []);

  const getActionColumn = useCallback((): IColumn => {
    return {
      label: "Actions",
      layout: (row: T) => {
        const actions = getActions?.(row) || [];
        return (
          <DotsMenu<T>
            actions={actions}
            onActionClick={handleClickAction}
            row={row}
          />
        );
      },
    };
  }, [getActions, handleClickAction]);

  const columnsData = useMemo(() => {
    const hasActions = !!getActions;


    return hasActions && hasOtherPermissionButGet(permList, section)
      ? [...columns, getActionColumn()]
      : columns;
  }, [columns, getActionColumn, getActions, permList, section]);

  const handlePageChange = (_: any, pageNumber: number) => {
    filterOptions?.reset({
      ...filters,
      page: pageNumber + 1,
    });
    onChange?.();
  };

  const generateColumns = useMemo(() => {
    return columnsData?.map((column, index) => (
      <TableCell key={index} align="left">
        {column?.label}
      </TableCell>
    ));
  }, [columnsData]);

  const generateSingleRow = (row: any) => {
    return columnsData?.map((column, index) => {
      if (column.layout) {
        return (
          <TableCell key={index} scope="row">
            {column.layout(row)}
          </TableCell>
        );
      } else {
        return (
          <TableCell key={index} scope="row">
            {column?.field ? row[column.field] : "-"}
          </TableCell>
        );
      }
    });
  };

  const generateRowsPaginated = () => {
    return paginatedData?.items.map((row, rowIndex) => (
      <TableRow
        key={rowIndex}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        {generateSingleRow(row)}
      </TableRow>
    ));
  };

  const generateSimpleRows = () => {
    return data?.map((row, rowIndex) => (
      <TableRow
        key={rowIndex}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        {generateSingleRow(row)}
      </TableRow>
    ));
  };

  const getPagination = (component: any = "td") => {
    return paginatedData?.items?.length && enablePagination ? (
      <TablePagination
        component={component}
        count={paginatedData.meta.totalItems}
        rowsPerPage={filters?.limit}
        rowsPerPageOptions={rowsPerPageOptions}
        page={filters?.page - 1}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        ActionsComponent={TablePaginationActions}
      />
    ) : null;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Box display={"flex"} justifyContent="flex-end">
          {getPagination("div")}
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>{generateColumns}</TableRow>
          </TableHead>
          <TableBody>
            {enablePagination ? generateRowsPaginated() : generateSimpleRows()}
          </TableBody>
          <TableFooter>
            <TableRow>{getPagination()}</TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default BasicTable;
