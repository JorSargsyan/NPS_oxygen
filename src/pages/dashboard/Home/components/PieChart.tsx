import { Theme, useMediaQuery } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { IScoreValues } from "store/interfaces/dashboard";

const PieChart = ({
  chartData,
  label,
  colors,
  labels,
  series,
}: {
  chartData: IScoreValues;
  label: string;
  colors: string[];
  labels: string[];
  series: number[];
}) => {
  const lgUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up("lg"));
  const width = lgUp ? "400" : "240";

  return (
    <div>
      <ReactApexChart
        options={{
          legend: {
            position: "bottom",
          },
          chart: {
            type: "pie",
            width,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    show: true,
                  },
                  value: {
                    show: true,
                  },
                  total: {
                    show: true,
                    label: label,
                    showAlways: true,
                    formatter: (w: any) => {
                      return `${chartData?.score}%`;
                    },
                  },
                },
              },
            },
          },
          labels: labels,
          colors: colors,
        }}
        series={series}
        type="donut"
        width={width}
        height={lgUp ? "auto" : "300"}
      />
    </div>
  );
};

export default PieChart;
