import ReactApexChart from "react-apexcharts";
import { IScoreValues } from "store/interfaces/dashboard";

const PieChart = ({ chartData }: { chartData: IScoreValues }) => {
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
            width: 300,
          },
          labels: ["Bad", "Ordinary", "Good"],
        }}
        series={[badCount, ordinaryCount, goodCount]}
        type="pie"
        width={300}
      />
    </div>
  );
};

export default PieChart;
