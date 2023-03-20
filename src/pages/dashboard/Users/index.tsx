import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import BasicTable from "shared/ui/Table";
import { IUser } from "store/interfaces/users";
import { GetUsers, selectUsers } from "store/slicers/users";
import { userColumns } from "./constants";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const Users = () => {
  const dispatch = useAsyncDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(
      GetUsers({
        start: 0,
        length: 10,
        sortColumn: "",
        sortDirection: "",
        conditionMatch: 1,
        search: "",
        isArchived: false,
        filters: [],
        scoreFilter: [],
      })
    );
  }, [dispatch]);

  console.log(users);
  return (
    <Box p={4}>
      <Typography variant="h3">Users</Typography>
      <BasicTable<IUser>
        columns={userColumns}
        section={""}
        paginatedData={users}
      />
    </Box>
  );
};

export default Users;
