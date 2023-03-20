import format from "date-fns/format";

export const getQueryParams = (formData: { [key: string]: any }): string => {
  let result: { [key: string]: string } = {};

  Object.keys(formData).forEach((key) => {
    if (formData[key] instanceof Date) {
      result[key] = format(formData[key], "yyyy-MM-dd") || "";
    } else {
      result[key] = formData[key]?.toString() || "";
    }
  });

  return new URLSearchParams(result).toString();
};
