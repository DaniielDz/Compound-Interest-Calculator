import { useEffect } from "react";
import Highcharts from "highcharts";
import "../PieGraph.css";

const formatCurrency = (value) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

function PieGraph({ data }) {
  const { initialAmount, cumulativeContributions, cumulativeInterest } = data;
  const amount = initialAmount[initialAmount.length - 1];
  const contribution =
    cumulativeContributions[cumulativeContributions.length - 1];
  const interest = cumulativeInterest[cumulativeInterest.length - 1];
  const colors = ["#DC659B", "#02295D", "#96d134"];

  useEffect(() => {
    // Crear el gráfico de pastel
    Highcharts.chart("container1", {
      chart: {
        type: "pie",
      },
      title: {
        text: "Totals by Source",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          colors: colors,
          slicedOffset: 10,
          dataLabels: {
            enabled: true,
          },
        },
      },
      tooltip: {
        formatter: function () {
          return "<b>" + this.key + "</b>: " + formatCurrency(this.y);
        },
      },
      series: [
        {
          name: "",
          data: [
            {
              name: "Initial Amount",
              y: amount,
            },
            {
              name: "Total Contributions",
              y: contribution,
            },
            {
              name: "Total Interest Earned",
              y: interest,
            },
          ],
        },
      ],
    });
  }, [data]);

  return <div id="container1"></div>;
}

export default PieGraph;
