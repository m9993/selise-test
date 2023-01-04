import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["Sat","Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Summary in Line Chart",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const LineChart = (props) => {
    console.log(props.data.entry)
  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default LineChart;