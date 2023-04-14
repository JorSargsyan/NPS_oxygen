export const trendChartOptionsData = {
  colors: ["#369BFD", "#B663D2", "#8767D2", "#50C2B5"], //Blue, Purple, Violet, Teal
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
      show: true,
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
