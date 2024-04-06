import React from "react";

function StatsCard(props) {
  return (
    <div
      className={`rounded-lg ${props.color} p-4 flex items-center mt-4 w-96 space-x-48`}
    >
      <span
        className={`${props.textColor} text-lg font-semibold tracking-wide`}
      >
        {props.title}
      </span>
      <div>
        <span className="text-lg font-bold text-slate-600 mr-1">
          {props.value}
        </span>
        <span className="text-lg font-bold text-slate-400"> / 100</span>
      </div>
    </div>
  );
}

export default StatsCard;
