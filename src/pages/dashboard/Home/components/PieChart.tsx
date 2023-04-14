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
          colors: [
            "#E3474F" /* Red 500*/,
            "#D2D6DB",
            "#B7CA39" /* Olive 500 */,
          ],
        }}
        series={[badCount, ordinaryCount, goodCount]}
        type="donut"
        width={400}
      />
    </div>
  );
};

export default PieChart;
