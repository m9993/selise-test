import React from "react";
import LineChart from "../../components/LineChart";
import Navbar from "../../components/Navbar";
import Navigation from "../../components/Navigation";
import PieChart from "../../components/PieChart";

export default function index() {
  const [data, setData] = React.useState([]);
  const fetchData = () => {
    setData(JSON.parse(localStorage.getItem("pms_data")));
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="m-2 my-5 d-flex justify-content-between">
        <div>
          <h3>Report</h3>
          <Navigation />
        </div>

        <div className="mx-5 border rounded px-3 py-2">
          <div className="my-1">
            Total Cars Parked{" "}
            <span className="badge rounded-pill text-bg-primary">
              {data.length}
            </span>
          </div>
          <div className="my-1">
            Total Emplty Slot (totally 100 sloats){" "}
            <span className="badge rounded-pill text-bg-primary">
              {100 - data.length}
            </span>
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-between mx-5">
        <div className="w-50 h-25">
          <LineChart data={data} />
        </div>
        <div className="w-25 h-25">
          <PieChart data={data} />
        </div>
      </div>
    </>
  );
}
