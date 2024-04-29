import { useEffect } from "react";
import Highcharts from "highcharts";

const formatCurrency = (value) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

function Graph({ data }) {
  const { years, cumulativeContributions, cumulativeInterest, initialAmount } =
    data;

  useEffect(() => {
    Highcharts.chart("container", {
      chart: {
        type: "column",
      },
      title: {
        text: "Growth Over Time",
        align: "center",
      },
      xAxis: {
        categories: years,
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: "Cumulative Contributions Over Time",
        },
        labels: {
          formatter: function () {
            return "$" + Highcharts.numberFormat(this.value / 1000, 0) + "k";
          },
        },
      },
      tooltip: {
        formatter: function () {
          return "<b>" + this.series.name + "</b>: " + formatCurrency(this.y);
        },
      },
      plotOptions: {
        column: {
          stacking: "normal",
        },
      },
      series: [
        {
          name: "Total Interest Earned",
          data: cumulativeInterest,
          color: "#96d134",
        },
        {
          name: "Cumulative Contributions",
          data: cumulativeContributions,
          color: "#02295D",
        },
        {
          name: "Initial Amount",
          data: initialAmount,
          color: "#DC659B",
        },
      ],
    });
  }, [data]);

  return <div id="container"></div>;
}

export default Graph;
