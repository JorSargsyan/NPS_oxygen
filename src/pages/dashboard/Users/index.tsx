import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import BasicTable from "shared/ui/Table";
import { IUserCompact } from "store/interfaces/users";
import { GetUserById, GetUsers, selectUsers } from "store/slicers/users";
import { userColumns } from "./constants";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { defaultFilterValues } from "resources/constants";
import RightDrawer from "shared/ui/Drawer";
import UserDetails from "./components/UserDetails";
import { useLocation } from "react-router-dom";
import { ERequestStatus } from "store/enums/index.enum";

const Users = () => {
  const location = useLocation();
  const dispatch = useAsyncDispatch();
  const users = useSelector(selectUsers);
  const [activeRow, setActiveRow] = useState(0);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const methods = useForm({
    defaultValues: { filters: defaultFilterValues },
  });

  const refetchUsers = () => {
    dispatch(GetUsers(methods.watch("filters")));
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
      <Typography variant="h3">Users</Typography>
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
    </Box>
  );
};

export default Users;
