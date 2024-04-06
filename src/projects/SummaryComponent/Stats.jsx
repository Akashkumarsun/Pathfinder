import React from "react";
import StatsCard from "./StatsCard";

function Stats() {
  return (
    <div className="px-10 py-7">
      <p className="text-2xl font-semibold">Summary</p>
      <StatsCard
        color="bg-red-100"
        textColor="text-red-600"
        title="Reaction"
        value="80"
      />
      <StatsCard
        color="bg-yellow-100"
        textColor="text-yellow-600"
        title="Memory"
        value="80"
      />
      <StatsCard
        color="bg-green-100"
        textColor="text-green-600"
        title="Verbal"
        value="80"
      />
      <StatsCard
        color="bg-indigo-100"
        textColor="text-indigo-600"
        title="Visual"
        value="80"
      />
    </div>
  );
}

export default Stats;
