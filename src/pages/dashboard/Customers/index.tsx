import { useCallback, useEffect, useMemo } from "react";
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
import usePermission from "shared/helpers/hooks/usePermission";
import { ECustomersPermissions } from "resources/permissions/permissions.enum";
import useTranslation from "shared/helpers/hooks/useTranslation";

const Customers = () => {
  const dispatch = useAsyncDispatch();
  const customers = useSelector(selectCustomers);
  const t = useTranslation();

  const hasEditPermission = usePermission(ECustomersPermissions.Edit);
  // const hasExportPermission = usePermission(ECustomersPermissions.Export);

  const methods = useForm({
    defaultValues: { config: defaultFilterValues },
  });

  const refetchCustomers = useCallback(async () => {
    await dispatch(setTableLoading(true));
    const data = {
      ...methods.watch("config"),
      filters: methods.watch("config.filters").filter((i) => i),
    };
    await dispatch(GetCustomers(data));
    await dispatch(setTableLoading(false));
  }, [dispatch, methods]);

  const handleChangeStatus = useCallback(
    async (e, rowId) => {
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
    },
    [dispatch, refetchCustomers]
  );

  const statusColumn = useMemo(() => {
    return {
      label: "status",
      layout: (row: ICustomer) => {
        return (
          <Box textAlign="center">
            <Select
              disabled={!hasEditPermission}
              size="small"
              value={row.customerStatus.id}
              onChange={(e) => handleChangeStatus(e, row.id)}
            >
              <MenuItem disabled={row.customerStatus.id === 1} value={1}>
                {t("active")}
              </MenuItem>
              <MenuItem disabled={row.customerStatus.id === 2} value={2}>
                {t("blocked")}
              </MenuItem>
              <MenuItem disabled value={3}>
                {t("quarantined")}
              </MenuItem>
            </Select>
            {row.customerStatus.id === 3 && (
              <Typography mt={0.4} fontSize={12}>
                {t("until")} {row.quarantineEndDate}
              </Typography>
            )}
          </Box>
        );
      },
    };
  }, [t, hasEditPermission, handleChangeStatus]);

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
    // console.log(ids);
  };

  const init = useCallback(async () => {
    await dispatch(setTableLoading(true));
    await dispatch(GetCustomers(defaultFilterValues));
    await dispatch(setTableLoading(false));
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={500} color="text.secondary">
        {t("customers_section_title")}
      </Typography>
      <BasicTable<ICustomer>
        // selectable={hasExportPermission}
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
