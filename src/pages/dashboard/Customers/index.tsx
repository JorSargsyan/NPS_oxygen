import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import BasicTable from "shared/ui/Table";
import { customerColumns } from "./constants";
import { Box } from "@mui/system";
import { MenuItem, Select, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { defaultFilterValues } from "resources/constants";
import {
  ChangeCustomerStatus,
  ExportCustomers,
  GetCustomers,
  selectCustomers,
} from "store/slicers/customers";
import { ICustomer } from "store/interfaces/customers";
import { ERequestStatus } from "store/enums/index.enum";
import Filters from "./components/Filters";
import { EBaseUrl } from "store/config/constants";
import { setTableLoading } from "store/slicers/common";

const Customers = () => {
  const dispatch = useAsyncDispatch();
  const customers = useSelector(selectCustomers);

  const handleChangeStatus = async (e, rowId) => {
    const { meta } = await dispatch(
      ChangeCustomerStatus({
        id: rowId,
        formData: {
          state: e.target.value,
        },
      })
    );

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    refetchCustomers();
  };

  const statusColumn = {
    label: "Status",
    layout: (row: ICustomer) => {
      return (
        <Box>
          <Select
            size="small"
            value={row.customerStatus.id}
            onChange={(e) => handleChangeStatus(e, row.id)}
          >
            <MenuItem disabled={row.customerStatus.id === 1} value={1}>
              Active
            </MenuItem>
            <MenuItem disabled={row.customerStatus.id === 2} value={2}>
              Blocked
            </MenuItem>
            <MenuItem disabled value={3}>
              Quarantined
            </MenuItem>
          </Select>
          {row.customerStatus.id === 3 && (
            <Typography mt={0.4} fontWeight={"bold"} fontSize={12}>
              Until {row.quarantineEndDate}
            </Typography>
          )}
        </Box>
      );
    },
  };

  const methods = useForm({
    defaultValues: { config: defaultFilterValues },
  });

  const refetchCustomers = async () => {
    await dispatch(setTableLoading(true));
    const data = {
      ...methods.watch("config"),
      filters: methods.watch("config.filters").filter((i) => i),
    };
    await dispatch(GetCustomers(data));
    await dispatch(setTableLoading(false));
  };

  const handleExport = async (selected: number[]) => {
    const { meta, payload } = await dispatch(
      ExportCustomers({ customerIDs: selected })
    );

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    const fileUrl = EBaseUrl.BaseURL + payload;

    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  const handleChangeSelected = (ids: number[]) => {
    console.log(ids);
  };

  useEffect(() => {
    dispatch(GetCustomers(defaultFilterValues));
  }, [dispatch]);

  return (
    <Box p={4}>
      <Typography variant="h3">Customers</Typography>
      <BasicTable<ICustomer>
        selectable
        hasSearchInput
        onExport={handleExport}
        Filter={() => <Filters onChange={refetchCustomers} methods={methods} />}
        filterOptions={{ watch: methods.watch, reset: methods.reset }}
        columns={[...customerColumns, statusColumn]}
        paginatedData={customers}
        onChange={refetchCustomers}
        onChangeSelected={handleChangeSelected}
      />
    </Box>
  );
};

export default Customers;
