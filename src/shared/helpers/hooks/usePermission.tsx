import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectPermissions } from "store/slicers/common";

const usePermission = (perm: string) => {
  const permList = useSelector(selectPermissions);

  const hasPermission = useMemo(() => {
    return permList?.hasOwnProperty(perm);
  }, [permList, perm]);

  return hasPermission;
};

export default usePermission;
