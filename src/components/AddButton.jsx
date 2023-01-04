import React from "react";

export default function AddButton(props) {
  return (
    <button className="btn btn-sm btn-primary my-3" onClick={()=>props.setIsAddModalVisible(true)}>
      <i className="fa fa-plus text-white" aria-hidden="true"></i>
    </button>
  );
}
