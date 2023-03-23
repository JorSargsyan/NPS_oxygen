import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import BasicTable from "shared/ui/Table";
import { IUserCompact } from "store/interfaces/users";
import { GetUsers, selectUsers } from "store/slicers/users";
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

const Users = () => {
  const location = useLocation();
  const dispatch = useAsyncDispatch();
  const users = useSelector(selectUsers);
  const [activeRow, setActiveRow] = useState(0);
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const methods = useForm({
    defaultValues: {
      config: { ...defaultFilterValues, filters: [defaultFilterRowValue] },
    },
  });

  const { append, remove, fields } = useFieldArray({
    name: "config.filters",
    control: methods.control,
  });

  const refetchUsers = () => {
    const filters = methods.watch("config.filters").map((filter, index) => {
      return {
        ...filter,
        rowId: index + 1,
        hidden: null,
        label: filter.value.label,
        value: filter.value.value,
        type: filter.type.type,
        key: filter.type.label,
      };
    });

    dispatch(
      GetUsers({
        ...methods.watch("config"),
        filters,
      })
    );
    setFiltersOpen(false);
  };

  const handleChangeSelected = (ids: number[]) => {
    // console.log(ids);
  };

  const handleView = (rowId: number) => {
    setActiveRow(rowId);
    setDrawerOpen(true);
  };

  const getActions = (rowData: IUserCompact) => {
    return [
      {
        label: "View",
        onClick: () => handleView(rowData.id),
      },
    ];
  };

  const handlePrefillUser = useCallback(async () => {
    setActiveRow(location.state.id);
    setDrawerOpen(true);
  }, [location.state?.id]);

  useEffect(() => {
    dispatch(GetUsers(defaultFilterValues));
  }, [dispatch]);

  useEffect(() => {
    if (location.state) {
      handlePrefillUser();
    }
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
        selectable
        hasSearchInput
        filterOptions={{ watch: methods.watch, reset: methods.reset }}
        columns={userColumns}
        getActions={getActions}
        paginatedData={users}
        onChange={refetchUsers}
        onChangeSelected={handleChangeSelected}
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
