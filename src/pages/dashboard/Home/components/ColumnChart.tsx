import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import { ECampaignSurveyType } from "pages/dashboard/CampaignDetails/questions/LeftSidebar/constants";
import { CSAT_COLORS, NPS_COLORS, CES_COLORS } from "../constants";

export type ChartTypes =
  | "bar"
  | "line"
  | "area"
  | "histogram"
  | "pie"
  | "donut"
  | "radialBar"
  | "scatter"
  | "bubble"
  | "heatmap"
  | "treemap"
  | "boxPlot"
  | "candlestick"
  | "radar"
  | "polarArea"
  | "rangeBar";

const colors = [];

const state = {
  options: {
    chart: {
      height: 350,
      type: "bar" as ChartTypes,
    },

    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return "Score " + dataPointIndex + ": " + value;
        },
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      labels: {
        style: {
          colors: colors,
          fontSize: "12px",
        },
      },
    },
  } as ApexOptions,
};

const ColumnsChart = ({ series, label, type }) => {
  const stateSeries = useMemo(() => {
    const data = series?.map((i) => i.value);
    return data;
  }, [series]);

  const chartColors = useMemo(() => {
    let colors = [];
    switch (type) {
      case ECampaignSurveyType.CustomerSatisfactionScore:
        colors = CSAT_COLORS;
        break;
      case ECampaignSurveyType.Nps:
      case ECampaignSurveyType.ServiceQualityScore:
        colors = NPS_COLORS;
        break;
      case ECampaignSurveyType.CustomerEffortScore:
        colors = CES_COLORS;
        break;
    }
    return colors;
  }, [type]);

  const chartCategories = useMemo(() => {
    let categories = [];
    switch (type) {
      case ECampaignSurveyType.Nps:
      case ECampaignSurveyType.ServiceQualityScore:
        categories = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        break;
      case ECampaignSurveyType.CustomerSatisfactionScore:
      case ECampaignSurveyType.CustomerEffortScore:
        categories = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        break;
    }
    return categories;
  }, [type]);

  return (
    <ReactApexChart
      options={{
        ...state.options,
        colors: chartColors,
        xaxis: {
          ...state.options.xaxis,
          categories: chartCategories,
        },
      }}
      series={[{ name: label, data: stateSeries || [] }]}
      type={state.options.chart.type as ChartTypes}
      height={state.options.chart.height}
    />
  );
};

export default ColumnsChart;
