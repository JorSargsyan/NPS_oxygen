export const debounce = (func: (...args: any) => void, timeout = 600) => {
  let timer: NodeJS.Timeout;
  return (...args: []) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const hasUserPermission = (arr: string[] | undefined, perm: string) => {
  return arr?.includes(perm);
};
export const hasOtherPermissionButGet = (
  arr: string[] | undefined,
  permSection: string
) => {
  const sectionArrLength: number | undefined = arr?.filter(
    (i) => i.includes(permSection) && !i.includes("get")
  )?.length;
  return !!sectionArrLength;
};
