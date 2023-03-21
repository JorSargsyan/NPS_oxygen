import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import BasicTable from "shared/ui/Table";
import { IUser } from "store/interfaces/users";
import { GetUsers, selectUsers } from "store/slicers/users";
import { userColumns } from "./constants";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { defaultFilterValues } from "resources/constants";

const Users = () => {
  const dispatch = useAsyncDispatch();
  const users = useSelector(selectUsers);
  const methods = useForm({
    defaultValues: { filters: defaultFilterValues },
  });

  const refetchUsers = () => {
    console.log(methods.watch("filters"));
    dispatch(GetUsers(methods.watch("filters")));
  };

  const handleChangeSelected = (ids: number[]) => {
    console.log(ids);
  };

  const handleView = (rowId: number) => {
    console.log(rowId);
  };

  const getActions = (rowData: IUser) => {
    return [
      {
        label: "View",
        onClick: () => handleView(rowData.id),
      },
    ];
  };

  useEffect(() => {
    dispatch(GetUsers(defaultFilterValues));
  }, [dispatch]);

  return (
    <Box p={4}>
      <Typography variant="h3">Users</Typography>
      <BasicTable<IUser>
        selectable
        filterOptions={{ watch: methods.watch, reset: methods.reset }}
        columns={userColumns}
        getActions={getActions}
        paginatedData={users}
        onChange={refetchUsers}
        onChangeSelected={handleChangeSelected}
      />
    </Box>
  );
};

export default Users;
