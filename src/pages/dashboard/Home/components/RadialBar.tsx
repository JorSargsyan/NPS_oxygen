import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ChartTypes } from "./ColumnChart";

const state = {
  options: {
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
      },
    },
    type: "radialBar",
    labels: ["NPS"],
  } as ApexOptions,
};

const RadialBar = ({ series, label }) => {
  return (
    <ReactApexChart
      options={{ ...state.options, labels: [label] }}
      series={series}
      type={state.options.chart.type as ChartTypes}
      height={state.options.chart.height}
    />
  );
};

export default RadialBar;
