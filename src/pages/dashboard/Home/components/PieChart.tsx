import ReactApexChart from "react-apexcharts";
import { IScoreValues } from "store/interfaces/dashboard";

const PieChart = ({
  chartData,
  label,
}: {
  chartData: IScoreValues;
  label: string;
}) => {
  const { badCount, goodCount, ordinaryCount } = chartData;
  return (
    <div>
      <ReactApexChart
        options={{
          legend: {
            position: "bottom",
          },
          chart: {
            type: "pie",
            width: 400,
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
          labels: ["Detractors", "Passives", "Promoters"],
          colors: ["#ee695f", "#D2D6DB", "#00BC8A"],
        }}
        series={[badCount, ordinaryCount, goodCount]}
        type="donut"
        width={400}
      />
    </div>
  );
};

export default PieChart;
