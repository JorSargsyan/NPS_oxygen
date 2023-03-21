import FilterListIcon from "@heroicons/react/24/solid/AdjustmentsHorizontalIcon";
import DeleteIcon from "@heroicons/react/24/solid/TrashIcon";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  alpha,
  Box,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { UseFormReset, UseFormWatch } from "react-hook-form";
import { IPaginated } from "store/interfaces/main";
import DotsMenu from "../DotsMenu";
import { IColumn, rowsPerPageOptions } from "./constants";
export interface IAction<T> {
  label: string;
  onClick: (row: T) => any;
}

export interface ITableProps<T> {
  columns: IColumn[];
  data?: T[];
  paginatedData?: IPaginated<T>;
  onChange?: () => void;
  onChangeSelected?: (list: number[]) => void;
  selectable?: boolean;
  getActions?: (row: T) => IAction<T>[];
  enablePagination?: boolean;
  filterOptions?: {
    watch: UseFormWatch<any>;
    reset: UseFormReset<any>;
  };
  section?: string;
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

const EnhancedToolbar = ({ rowsSelected }: { rowsSelected: number }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(rowsSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {rowsSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {rowsSelected} selected
        </Typography>
      ) : (
        <Box sx={{ flex: "1 1 100%" }}>
          {/* TODO ADD SEARCH,FILTERS, OTHER STUFF */}
        </Box>
      )}
      {rowsSelected > 0 ? (
        <Tooltip title="Delete">
          <DeleteIcon height={24} width={24} />
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <FilterListIcon height={24} width={24} />
        </Tooltip>
      )}
    </Toolbar>
  );
};

const BasicTable = <T extends { id: number }>({
  columns,
  data,
  selectable = false,
  onChangeSelected,
  paginatedData,
  onChange,
  getActions,
  filterOptions,
  enablePagination = true,
  section,
}: ITableProps<T>): JSX.Element => {
  const filters = filterOptions?.watch("filters");
  const [selectedList, setSelectedList] = useState([]);

  const handleCheckAll = useCallback(
    (_, checked) => {
      if (checked) {
        setSelectedList(
          enablePagination
            ? paginatedData?.displayData?.map((i) => i.id)
            : data?.map((i) => i.id)
        );
      } else {
        setSelectedList([]);
      }
    },
    [data, enablePagination, paginatedData?.displayData]
  );

  const handleCheckRow = useCallback((row: T, checked: boolean) => {
    if (checked) {
      setSelectedList((state) => [...state, row.id]);
    } else {
      setSelectedList((state) => state.filter((i) => i !== row.id));
    }
  }, []);

  const handleRowsPerPageChange = (e: any) => {
    const value = e.target.value;
    filterOptions?.reset({
      ...filterOptions.watch(),
      filters: {
        ...filters,
        length: value,
      },
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

    return hasActions ? [...columns, getActionColumn()] : columns;
  }, [columns, getActionColumn, getActions]);

  const handlePageChange = (_: any, pageNumber: number) => {
    filterOptions?.reset({
      ...filterOptions.watch(),
      filters: {
        ...filters,
        start: pageNumber * filters?.length,
      },
    });
    onChange?.();
  };

  const handleSort = useCallback(
    (prop: string, direction: string) => (_: any) => {
      filterOptions?.reset({
        ...filterOptions.watch(),
        filters: {
          ...filters,
          sortDirection: direction,
          sortColumn: prop,
        },
      });
      onChange?.();
    },
    [filterOptions, filters, onChange]
  );

  const generateColumns = useMemo(() => {
    return (
      <Fragment>
        {selectable ? (
          <TableCell align="left">
            <Checkbox
              checked={
                selectedList?.length ===
                (enablePagination ? paginatedData?.displayData : data).length
              }
              onChange={handleCheckAll}
            />
          </TableCell>
        ) : null}
        {columnsData?.map((column, index) => (
          <TableCell key={index} align="left">
            <TableSortLabel
              active={filters?.sortColumn === column.field}
              direction={
                filters?.sortColumn === column.field
                  ? filters?.sortDirection
                  : "asc"
              }
              onClick={handleSort(
                column.field,
                filters?.sortDirection === "asc" ? "desc" : "asc"
              )}
            >
              {column.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </Fragment>
    );
  }, [
    columnsData,
    data,
    enablePagination,
    filters?.sortColumn,
    filters?.sortDirection,
    handleCheckAll,
    handleSort,
    paginatedData?.displayData,
    selectable,
    selectedList?.length,
  ]);

  const generateSingleRow = (row: any) => {
    return (
      <Fragment>
        {selectable ? (
          <TableCell scope="row">
            <Checkbox
              checked={selectedList.includes(row.id)}
              onChange={(_, checked) => handleCheckRow(row, checked)}
            />
          </TableCell>
        ) : null}
        {columnsData?.map((column, index) => {
          return (
            <Fragment key={index}>
              {column?.layout ? (
                <TableCell scope="row">{column.layout(row)}</TableCell>
              ) : (
                <TableCell scope="row">
                  {column?.field ? row[column.field] : "-"}
                </TableCell>
              )}
            </Fragment>
          );
        })}
      </Fragment>
    );
  };

  const generateRowsPaginated = () => {
    return paginatedData?.displayData?.map((row, rowIndex) => (
      <TableRow
        hover
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
    return paginatedData?.displayData?.length && enablePagination ? (
      <TablePagination
        component={component}
        count={paginatedData?.totalRecords}
        rowsPerPage={filters?.length}
        rowsPerPageOptions={rowsPerPageOptions}
        page={filters?.start / filters?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        ActionsComponent={TablePaginationActions}
      />
    ) : null;
  };

  useEffect(() => {
    onChangeSelected?.(selectedList);
  }, [onChangeSelected, selectedList]);

  return (
    <Box pt={4}>
      <TableContainer component={Paper}>
        <EnhancedToolbar rowsSelected={selectedList.length} />
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
    </Box>
  );
};

export default BasicTable;
