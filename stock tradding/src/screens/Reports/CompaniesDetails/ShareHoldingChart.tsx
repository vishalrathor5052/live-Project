import Highcharts from "highcharts";
import PieChart from "highcharts-react-official";

const ShareHoldingChart = () => {
  const options = {
    title: {
      text: "My chart",
    },
    series: [
      {
        data: [1, 2, 3],
        name: "paython",
        students: 13,
        fees: "10",
      },
    ],
  };
  return (
    <>
      <h2>Highcharts</h2>
      <PieChart highcharts={Highcharts} options={options} />
    </>
  );
};

export default ShareHoldingChart;
