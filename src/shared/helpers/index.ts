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

export const formatDateString = (date: string) => {
  const splittedDate = date.split(" ");
  const newDate = splittedDate[0]
    .split("/")
    .reverse()
    .join("/")
    .concat(` ${splittedDate[1]}`);
  return newDate;
};
