import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { FC } from "react";
interface DoughnutProps {
  cutout?: number;
}

const DonutChart: FC<DoughnutProps>  = ({
  cutout
}) => {
  const data = {
    labels: [
    ],
    datasets: [{
      label: '',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      borderRadius:30,
      borderWidth: 4,
      hoverOffset: 4,
      cutout: cutout,
    }]
  };
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default DonutChart;
