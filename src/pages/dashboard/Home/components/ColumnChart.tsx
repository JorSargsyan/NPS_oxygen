import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useMemo } from "react";

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

const colors = [
  "#B31919",
  "#C6342A",
  "#D94A3C",
  "#EC5F4E",
  "#FF7361",
  "#FF8D57",
  "#FFA950",
  "#FFC550",
  "#FFE159",
  "#96D467",
  "#00BC8A",
];

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
    colors: colors,
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
      categories: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      labels: {
        style: {
          colors: colors,
          fontSize: "12px",
        },
      },
    },
  } as ApexOptions,
};

const ColumnsChart = ({ series, label }) => {
  const stateSeries = useMemo(() => {
    const data = series?.map((i) => i.value);
    return data;
  }, [series]);

  return (
    <ReactApexChart
      options={{
        ...state.options,
      }}
      series={[{ name: label, data: stateSeries || [] }]}
      type={state.options.chart.type as ChartTypes}
      height={state.options.chart.height}
    />
  );
};

export default ColumnsChart;
