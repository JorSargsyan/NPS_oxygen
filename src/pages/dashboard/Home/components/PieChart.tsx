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

          labels: ["Detractors", "Passives", "Promoters"],
          colors: ["#ee695f", "#D2D6DB", "#00BC8A"],
        }}
        series={[badCount, ordinaryCount, goodCount]}
        type="donut"
        width={300}
      />
    </div>
  );
};

export default PieChart;
