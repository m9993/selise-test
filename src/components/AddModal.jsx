import React from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { inputValidation } from "../utils/inputValidation";
import * as yup from "yup";

// status in=1; out=0
export default function AddModal(props) {
  const [inputData, setInputData] = React.useState({ status: true });
//   console.log(inputData);
  const closeModal = () => {
    props.setIsAddModalVisible(false);
    setInputData({ status: true });
  };

  const validationSchema = yup.object().shape({
    licenseNo: yup.string().min(2),
    type: yup.number().min(1).max(3).required(),
    name: yup.string().min(2).required(),
    phone: yup.string().min(11).required(),
    address: yup.string().min(2),
    status: yup.boolean().required(),
    entryTime: yup
      .date()
    //   .min(new Date(), "Entry Time can not be past")
      .required("Entry Time is required"),
    exitTime: yup
      .date()
      .when(
        "entryTime",
        (entryTime, yup) =>
        entryTime && yup.min(entryTime, "Exit Time can not be before start time")
      ),
  });

  const submit = () => {
    const data = JSON.parse(localStorage.getItem("pms_data")) || [];
    setInputData({
      ...inputData,
      id: Math.floor(Math.random() * 100),
    });
    data.unshift(inputData);
    setInputData({ status: true });
    localStorage.setItem("pms_data", JSON.stringify(data));
    toast.success("Info Inserted");
    closeModal()
    props.fetchData()
  };
  return (
    <Modal
      isOpen={props.isAddModalVisible}
      onRequestClose={closeModal}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
      contentLabel="Example Modal"
    >
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h5>Add Info</h5>
        <button className="btn" onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </button>
      </div>

      <div className="mb-3">
        <input
          className="form-control my-2"
          id="exampleFormControlInput1"
          placeholder="License Number"
          onChange={(e) =>
            setInputData({ ...inputData, licenseNo: e.target.value })
          }
        />
        <select
          className="form-select my-2"
          aria-label="Default select example"
          onChange={(e) => setInputData({ ...inputData, type: e.target.value })}
        >
          <option selected disabled value={null}>
            Select Type
          </option>
          <option value="1">Microbus</option>
          <option value="2">Car</option>
          <option value="3">Truck</option>
        </select>
        <input
          className="form-control my-2"
          id="exampleFormControlInput1"
          placeholder="Owner Name"
          onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
        />
        <input
          className="form-control my-2"
          id="exampleFormControlInput1"
          placeholder="Owner Phone"
          onChange={(e) =>
            setInputData({ ...inputData, phone: e.target.value })
          }
        />
        <textarea
          className="form-control my-2"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Address"
          onChange={(e) =>
            setInputData({ ...inputData, address: e.target.value })
          }
        />
        <div className="d-flex my-2">
          <div className="mx-1">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Entry Time
            </label>
            <input
              type="datetime-local"
              id="entryTime"
              name="entryTime"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, entryTime: e.target.value })
              }
            />
          </div>
          <div className="mx-1">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Exit Time
            </label>
            <input
              type="datetime-local"
              id="exitTime"
              name="exitTime"
              className="form-control"
              onChange={(e) => {
                setInputData({
                  ...inputData,
                  exitTime: e.target.value,
                  status: false,
                });
              }}
            />
          </div>
        </div>
        <div className="form-check form-switch my-2 mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            checked={inputData.status}
            onChange={(e) =>
              setInputData({ ...inputData, status: e.target.checked })
            }
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Status In?
          </label>
        </div>
        <div className="d-grid gap-2 my-2">
          <button
            className="btn btn-primary"
            type="button"
            onClick={async () => {
              const { isValidate } = await inputValidation(
                validationSchema,
                inputData
              );
              if (isValidate) {
                submit();
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
}
