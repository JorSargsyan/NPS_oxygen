import { ECampaignSurveyType } from "../CampaignDetails/questions/LeftSidebar/constants";
import NPS from "assets/icons/dashboard_nps.svg";
import eNPS from "assets/icons/dashboard_enps.svg";
import CES from "assets/icons/dashboard_ces.svg";
import CSAT from "assets/icons/dashboard_csat.svg";

export const trendChartOptionsData = {
  colors: ["#007AFF", "#643DC7", "#DD3A97", "#32B94A"], //Blue, Purple, Violet, Teal
  plotOptions: {
    area: {
      fillTo: "end",
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "center",
    fontSize: "16px",
    fontWeight: 600,
    fontFamily: "Montserrat",
    labels: {},
  },
  tooltip: {
    shared: true,
    intersect: false,
    x: {
      show: true,
      format: "dd MMMM",
    },
    y: [
      {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y + " %";
          }
          return y;
        },
      },
      {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y + " %";
          }
          return y;
        },
      },
      {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y + " %";
          }
          return y;
        },
      },
      {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y + " %";
          }
          return y;
        },
      },
    ],
  },
  markers: {
    size: 4,
    strokeColors: ["white", "white"],
    hover: {
      sizeOffset: 3,
    },
  },
  stroke: {
    curve: "straight",
  },
  chart: {
    id: "1",
    width: "100%",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    animations: {
      initialAnimation: {
        enabled: true,
      },
    },
  },
  xaxis: {
    type: "datetime",
    labels: {
      style: {
        colors: ["white"],
        fontSize: "12px",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
};

export const CSAT_COLORS = [
  "#7FCAFE",
  "#369BFD",
  "#AA8FDF",
  "#6443C5",
  "#9F40C4",
]; //500 LINE OF COLORS
export const CES_COLORS = [
  "#F0F1AD",
  "#CBD85A",
  "#5DC66A",
  "#2C933E",
  "#F7B937",
  "#AA8FDF",
  "#6443C5",
];
export const NPS_COLORS = [
  "#AA8FDF",
  "#8767D2",
  "#6443C5",
  "#CD8BDF",
  "#B663D2",
  "#9F40C4",
  "#F490C3",
  "#DA3B97",
  "#71CFC1",
  "#50C2B5",
  "#35B7AD",
];
export const eNPS_COLORS = [
  "#5AB4FD",
  "#369BFD",
  "#1B7FFC",
  "#1467D7",
  "#71CFC1",
  "#50C2B5",
  "#35B7AD",
  "#2C933E",
  "#DEE581",
  "#CBD85A",
  "#B7CA39",
];

export const DashboardIcons = {
  [ECampaignSurveyType.Nps]: NPS,
  [ECampaignSurveyType.ServiceQualityScore]: eNPS,
  [ECampaignSurveyType.CustomerEffortScore]: CES,
  [ECampaignSurveyType.CustomerSatisfactionScore]: CSAT,
};
