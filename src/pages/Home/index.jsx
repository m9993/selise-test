import React from "react";
import { ToastContainer } from "react-toastify";
import AddButton from "../../components/AddButton";
import AddModal from "../../components/AddModal";
import "./home.css";
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment/moment";
import Navigation from "../../components/Navigation";
import Navbar from "../../components/Navbar";

export default function index() {
  const [isAddModalVisible, setIsAddModalVisible] = React.useState(false);
  const [data, setData] = React.useState([]);
  const fetchData=()=>{
    setData(JSON.parse(localStorage.getItem('pms_data')))
  }
  React.useEffect(() => {
    fetchData()
  }, [])
  const getType=(id)=>{
    if(id==1) return "Microbus"
    if(id==2) return "Car"
    if(id==3) return "Truck"
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        // closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Navbar/>

      <div className="d-flex flex-wrap justify-content-between">
        <div className="m-2 mt-5">
            <h3>Dashboard</h3>
            <Navigation/>
        </div>
        <div className="col-2 m-3">
          <h6>Parking Charges</h6>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Microbus{" "}
              <span className="badge rounded-pill text-bg-primary">70৳</span>
            </li>
            <li className="list-group-item">
              Car{" "}
              <span className="badge rounded-pill text-bg-primary">50৳</span>
            </li>
            <li className="list-group-item">
              Truck{" "}
              <span className="badge rounded-pill text-bg-primary">100৳</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-5">
        <AddButton setIsAddModalVisible={setIsAddModalVisible} />
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Owner Name</th>
              <th scope="col">Vehicle Type</th>
              <th scope="col">License No.</th>
              <th scope="col">Entry Time</th>
              <th scope="col">Exit Time</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item,index)=>( 
            <tr key={index}>
              <th scope="row">{index+1}</th>
              <td>{item.name}</td>
              <td>{getType(item.type)}</td>
              <td>{item.licenseNo}</td>
              <td>{moment(item.entryTime).format('MMMM Do YYYY, h:mm:ss a')}</td>
              <td>{item.exitTime?moment(item.exitTime).format('MMMM Do YYYY, h:mm:ss a'):'-'}</td>
              <td>{!item.exitTime?<span className="badge rounded-pill text-bg-success">IN</span>:<span className="badge rounded-pill text-bg-danger">Out</span>}</td>
              <td>
                {!item.exitTime?
                  <button className="btn btn-sm btn-warning" ><i className="fa fa-pencil" aria-hidden="true"></i></button>
                  : "Restricted"
                }
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD MODAL */}
      <AddModal
        setIsAddModalVisible={setIsAddModalVisible}
        isAddModalVisible={isAddModalVisible}
        fetchData={fetchData}
      />
      {/* Add MODAL */}
    </>
  );
}
