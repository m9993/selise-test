import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

const PieChart = (props) => {
    const [countMicrobus, setMicrobusCount] = useState(0)
    const [countCar, setCarCount] = useState(1)
    const [countTruck, setTruckCount] = useState(0)
  
    useEffect(() => {
        props.data.map(item=>{
            if(item.type==1){setMicrobusCount(countMicrobus+1)}
            if(item.type==2){setCarCount(countCar+1)}
            if(item.type==3){setTruckCount(countTruck+1)}
          });
    }, [props.data])
    
  const labels = ["Microbus", "Car", "Truck"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total",
        data: [countMicrobus, countCar, countTruck],
        backgroundColor: [
          "#007D9C",
          "#244D70",
          "#D123B3",
          "#F7E018",
          "#fff",
          "#FE452A",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <h6>All Vehicles Parked</h6>
      <Pie data={data} />
    </div>
  );
};
export default PieChart;
