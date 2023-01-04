import React from "react";
import { Link } from "react-router-dom";

export default function navigation() {
  return (
    <div>
      <span className="m-1">
        <Link to="/">Home</Link>
      </span>
      |
      <span className="m-1">
        <Link to="/report">Report</Link>
      </span>
    </div>
  );
}
