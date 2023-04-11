import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ChartTypes } from "./ColumnChart";
import { useMemo } from "react";
import { scoreColors, scoreRanges } from "pages/dashboard/FeedBacks/constants";

const state = {
  options: {
    chart: {
      height: 300,
      type: "radialBar",
    },
    plotOptions: {
      label: {},
      radialBar: {
        hollow: {
          size: "40%",
        },
      },
    },
    type: "radialBar",
  } as ApexOptions,
};

const RadialBar = ({ series, label }: { series: number[]; label: string }) => {
  const barColors = useMemo(() => {
    const val = series?.[0] / 10;
    if (val >= scoreRanges.bad[0] && val <= scoreRanges.bad[1]) {
      return scoreColors.bad.chartColor;
    } else if (val >= scoreRanges.neutral[0] && val <= scoreRanges.neutral[1]) {
      return scoreColors.neutral.chartColor;
    } else if (val >= scoreRanges.good[0] && val <= scoreRanges.good[1]) {
      return scoreColors.good.chartColor;
    } else {
      return scoreColors.veryBad.chartColor;
    }
  }, [series]);

  return (
    <ReactApexChart
      options={{ ...state.options, labels: [label], colors: [barColors] }}
      series={series}
      type={state.options.chart.type as ChartTypes}
      height={state.options.chart.height}
    />
  );
};

export default RadialBar;
