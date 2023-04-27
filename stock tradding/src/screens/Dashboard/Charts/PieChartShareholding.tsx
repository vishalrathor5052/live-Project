import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const PieChartShareholding = () => {
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      marginTop: 0,
      spacingLeft: 0,
      spacingRight: 0,
      spacingTop: 0,
    },

    title: {
      text: "",
      floating: true,
      align: "center",
      verticalAlign: "middle",
      y: 0,
      style: {
        fontWeight: 400,
      },
    },

    subtitle: {
      text: "",
      align: "center",
      verticalAlign: "middle",
      y: 0,
    },

    tooltip: {
      enabled: false,
    },

    plotOptions: {
      series: {
        states: {
          hover: {
            enabled: true,
          },
        },
      },

      point: {
        events: {
          legendItemClick: () => false,
        },
      },
      showInLegend: true,
      borderWidth: 0,
      colors: ["FF00FF", "00FF00"],

      pie: {
        allowPointSelect: false,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          distance: -30,
          //   rotation:-60,
          style: {},
        },
      },
    },

    series: [
      {
        innerSize: "67%",
        data: [
          {
            name: "Share1",
            y: 33.3,
            color: "#7522DE",
            style: {
              fontSize: "20px",
              color: "#ffffff",
            },
          },
          {
            name: "Share2",
            y: 33.3,
            color: "#C08DFF",
            style: {
              fontSize: "20px",
              color: "#ffffff",
            },
          },
          {
            name: "Share3",
            y: 33.3,
            color: "#D9BCFF",
            dataLabels: {
              enabled: true,
              rotation: 0,
            },
            style: {
              fontSize: "20px",
              color: "#ffffff",
            },
          },
        ],
      },
    ],

    credits: {
      enabled: false,
    },

    legend: {
      itemStyle: {
        color: "#787878",
      },
      symbolRadius: 0,
    },
  };

  return (
    <div className="piechart-shareholiding-main">
      <div style={{ backgroundColor: "white", padding: "1%" }}>
        <h4>Shareholding1</h4>
        <hr className="p-0"/>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChartShareholding;
