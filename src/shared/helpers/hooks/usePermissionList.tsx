import { useSelector } from "react-redux";
import { selectUserRole } from "store/slicers/roles";

const useGetUserPermissionsList = () => {
  const usersPermission = useSelector(selectUserRole);
  return usersPermission?.permissions;
};

export default useGetUserPermissionsList;
