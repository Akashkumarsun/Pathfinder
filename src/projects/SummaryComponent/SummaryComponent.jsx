import React from "react";
import Result from "./Result";
import Stats from "./Stats";

function SummaryComponent() {
  return (
    <div className="grid place-content-center h-screen">
      <div className="flex rounded-2xl bg-white shadow-lg">
        <Result />
        <Stats />
      </div>
    </div>
  );
}

export default SummaryComponent;
