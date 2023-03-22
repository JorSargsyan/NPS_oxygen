const toastOptions = {
  style: {
    minWidth: 500,
  },
  duration: 3000,
};

const RIGHT_SIDEBAR_WIDTH = 600;
const RIGHT_SIDEBAR_WIDTH_EXTENDED = 1000;

const defaultFilterValues = {
  start: 0,
  length: 5,
  search: "",
  sortColumn: "",
  sortDirection: "",
  conditionMatch: 1,
  isArchived: false,
  filters: [],
  scoreFilter: [],
};

export {
  toastOptions,
  defaultFilterValues,
  RIGHT_SIDEBAR_WIDTH,
  RIGHT_SIDEBAR_WIDTH_EXTENDED,
};