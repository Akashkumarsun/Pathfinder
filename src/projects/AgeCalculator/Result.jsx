import React from "react";

function Result(props) {
  return (
    <div>
      <div className="font-bold italic text-8xl">
        <span className="font-bold text-purple-700">{props.year}</span>{" "}
        <span>years</span>
      </div>
      <div className="font-bold italic text-8xl">
        <span className="font-bold text-purple-700">{props.month}</span>{" "}
        <span>months</span>
      </div>
      <div className="font-bold italic text-8xl">
        <span className="font-bold text-purple-700">{props.day}</span>{" "}
        <span>days</span>
      </div>
    </div>
  );
}

export default Result;
