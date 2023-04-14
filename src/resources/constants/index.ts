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

export enum ESurveyMetric {
  NPS = 1,
}

export enum ETouchPoint {
  Postal_office = 1,
}

export enum EChannel {
  LinkViaSms = 1,
  General_Link,
}

export enum ESurveyMetricValues {
  NPS = "NPS",
}

export enum ETouchPointValues {
  Postal_office = "PostalOffices",
}

export enum EChannelValues {
  LinkViaSms = "LinkViaSms",
  General_Link = "General Link",
}

export enum ECampaignType {
  Hot = "Hot",
}

export const campaignTypes = {
  surveyMetric: [
    {
      id: ESurveyMetric.NPS,
      label: "NPS",
      value: ESurveyMetricValues.NPS,
    },
  ],
  touchpoint: [
    {
      id: ETouchPoint.Postal_office,
      label: "Head Office",
      value: ETouchPointValues.Postal_office,
    },
  ],
  channel: [
    {
      id: 1,
      label: "Link Via Sms",
      value: EChannelValues.LinkViaSms,
    },
    {
      id: 2,
      label: "Link",
      value: EChannelValues.General_Link,
    },
  ],
  type: [
    {
      id: 1,
      label: "Hot",
      value: ECampaignType.Hot,
    },
  ],
};
export const ConditionList = [
  {
    name: "Is",
    value: "2",
  },
  {
    name: "Is not",
    value: "3",
  },
];

export const FilterConditionMatchList = [
  {
    name: "All",
    value: 1,
  },
  {
    name: "Any",
    value: 2,
  },
];
