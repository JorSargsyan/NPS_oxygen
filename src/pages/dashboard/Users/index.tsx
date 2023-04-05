import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import BasicTable from "shared/ui/Table";
import { IUserCompact } from "store/interfaces/users";
import {
  ExportUsers,
  GetUserRoles,
  GetUsers,
  selectUsers,
} from "store/slicers/users";
import { defaultFilterRowValue, userColumns } from "./constants";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import {
  RIGHT_SIDEBAR_WIDTH_EXTENDED,
  defaultFilterValues,
} from "resources/constants";
import RightDrawer from "shared/ui/Drawer";
import UserDetails from "./components/UserDetails";
import { useLocation } from "react-router-dom";
import Filters from "./components/Filters";
import { ERequestStatus } from "store/enums/index.enum";
import { EBaseUrl } from "store/config/constants";
import { setTableLoading } from "store/slicers/common";
import usePermission from "shared/helpers/hooks/usePermission";
import { EUserPermissions } from "resources/permissions/permissions.enum";

const Users = () => {
  const location = useLocation();
  const dispatch = useAsyncDispatch();
  const users = useSelector(selectUsers);
  const [activeRow, setActiveRow] = useState(0);
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const hasViewPermission = usePermission(EUserPermissions.View);
  const hasExportPermission = usePermission(EUserPermissions.Export);

  const methods = useForm({
    defaultValues: {
      config: { ...defaultFilterValues, filters: [defaultFilterRowValue] },
    },
  });

  const { append, remove, fields } = useFieldArray({
    name: "config.filters",
    control: methods.control,
  });

  const refetchUsers = async () => {
    await dispatch(setTableLoading(true));
    const filtersCombined = methods
      .watch("config.filters")
      .map((filter, index) => {
        return {
          ...filter,
          rowId: index + 1,
          hidden: null,
          label: filter.value?.label,
          value: filter.value?.value,
          type: filter.type?.type,
          key: filter.type?.label,
        };
      });

    let filters =
      filtersCombined.length === 1 && !filtersCombined[0].queryCondition
        ? []
        : filtersCombined;

    await dispatch(
      GetUsers({
        ...methods.watch("config"),
        filters,
      })
    );
    await dispatch(setTableLoading(false));
    setFiltersOpen(false);
  };

  const handleView = (rowId: number) => {
    setActiveRow(rowId);
    setDrawerOpen(true);
  };

  const getActions = (rowData: IUserCompact) => {
    if (!hasViewPermission) {
      return [];
    }
    return [
      {
        label: "View",
        onClick: () => handleView(rowData.id),
      },
    ];
  };

  const handlePrefillUser = useCallback(async () => {
    if (location.state?.id && hasViewPermission) {
      setActiveRow(location.state.id);
      setDrawerOpen(true);
    }
  }, [location.state?.id, hasViewPermission]);

  const handleExport = async (selected: number[]) => {
    const { meta, payload } = await dispatch(
      ExportUsers({ userIds: selected })
    );

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    const fileUrl = EBaseUrl.BaseURL + payload;

    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  const init = useCallback(async () => {
    await dispatch(setTableLoading(true));
    await dispatch(GetUsers(defaultFilterValues));
    await dispatch(GetUserRoles());
    await dispatch(setTableLoading(false));
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    handlePrefillUser();
  }, [handlePrefillUser, location.state]);

  return (
    <Box p={4}>
      <Box display="flex" justifyContent={"space-between"}>
        <Typography variant="h3">Users</Typography>
        <Button variant="outlined" onClick={() => setFiltersOpen(true)}>
          Advanced filters
        </Button>
      </Box>
      <BasicTable<IUserCompact>
        selectable={hasExportPermission}
        hasSearchInput
        onExport={handleExport}
        filterOptions={{ watch: methods.watch, reset: methods.reset }}
        columns={userColumns}
        getActions={getActions}
        paginatedData={users}
        onChange={refetchUsers}
      />
      <RightDrawer
        open={isDrawerOpen}
        setOpen={setDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={`View User`}
      >
        <UserDetails userId={activeRow} />
      </RightDrawer>
      <RightDrawer
        width={RIGHT_SIDEBAR_WIDTH_EXTENDED}
        open={isFiltersOpen}
        setOpen={setFiltersOpen}
        onClose={() => setFiltersOpen(false)}
        title={`Advanced filters`}
      >
        <Filters
          fieldsConfig={{ fields, append, remove }}
          onChange={refetchUsers}
          methods={methods}
        />
      </RightDrawer>
    </Box>
  );
};

export default Users;
