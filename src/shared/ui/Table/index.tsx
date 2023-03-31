import {
  Box,
  Checkbox,
  Divider,
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
  Typography,
} from "@mui/material";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectTableLoadingState } from "store/slicers/common";
import DotsMenu from "../DotsMenu";
import EnhancedToolbar from "./components/EnhancedToolbar";
import NoRows from "./components/NoRows";
import TablePaginationActions from "./components/TablePAginationActions";
import { IAction, IColumn, ITableProps, rowsPerPageOptions } from "./constants";

const BasicTable = <T extends { id: number }>({
  columns,
  data,
  selectable = false,
  sortable = true,
  onChangeSelected,
  paginatedData,
  Filter,
  toolbar = true,
  onExport,
  onChange,
  getActions,
  filterOptions,
  enablePagination = true,
  hasSearchInput = false,
}: ITableProps<T>): JSX.Element => {
  const filters = filterOptions?.watch("config");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const tableLoading = useSelector(selectTableLoadingState);

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
      config: {
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
      config: {
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

  const noResults = useMemo(() => {
    return !(enablePagination
      ? paginatedData?.displayData.length
      : data.length);
  }, [data?.length, enablePagination, paginatedData?.displayData?.length]);

  const generateColumns = useMemo(() => {
    return (
      <Fragment>
        {selectable ? (
          <TableCell align="left">
            {paginatedData?.displayData.length ? (
              <Checkbox
                checked={
                  selectedList?.length ===
                  (enablePagination ? paginatedData?.displayData : data)?.length
                }
                onChange={handleCheckAll}
              />
            ) : null}
          </TableCell>
        ) : null}
        {columnsData?.map((column, index) => (
          <TableCell key={index} align="left">
            {sortable ? (
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
            ) : (
              <Typography fontSize={12} fontWeight={500}>
                {column.label}
              </Typography>
            )}
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
    sortable,
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
        sx={{
          transform: "scale(1)",
          transition: "0.4s ease",
          "&:last-child td, &:last-child th": { border: 0 },
          "&:hover": { transform: "scale(1.02)", transition: "0.4s ease" },
        }}
      >
        {generateSingleRow(row)}
      </TableRow>
    ));
  };

  const generateSimpleRows = () => {
    return data?.map((row, rowIndex) => (
      <TableRow
        key={rowIndex}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          "&:hover": { transform: "scale(1.02)", transition: "0.4s ease" },
        }}
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
      {toolbar && (
        <EnhancedToolbar
          handleToggleFilter={() => setFiltersVisible((state) => !state)}
          rowsSelected={selectedList.length}
          filterOptions={filterOptions}
          onExport={() => onExport?.(selectedList)}
          hasFilters={!!Filter}
          fetchData={onChange}
          hasSearchInput={hasSearchInput}
        />
      )}
      {Filter && filtersVisible && (
        <Box>
          <Divider />
          <Filter />
        </Box>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {!noResults && (
            <TableHead>
              <TableRow>{generateColumns}</TableRow>
            </TableHead>
          )}

          <TableBody sx={tableLoading ? { filter: "blur(3px)" } : {}}>
            <Fragment>
              {enablePagination
                ? generateRowsPaginated()
                : generateSimpleRows()}
            </Fragment>
          </TableBody>

          <TableFooter>
            <TableRow>{getPagination()}</TableRow>
          </TableFooter>
        </Table>
        {!tableLoading && (
          <Table>
            <TableBody>{noResults && <NoRows />}</TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default BasicTable;
