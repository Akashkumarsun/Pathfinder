import React from "react";

function Result() {
  return (
    <div className="rounded-2xl bg-gradient-to-t from-indigo-700 to-indigo-500 px-10 py-7 text-center">
      <p className="font-semibold text-gray-300 text-2xl tracking-wide text-center">
        Your Result
      </p>
      <div className="h-44 w-44 bg-gradient-to-t from-indigo-500 to-indigo-700 rounded-full mt-6 grid place-content-center mx-auto">
        <p className="text-6xl text-white font-bold text-center">76</p>
        <p className="text-lg text-gray-300 font-semibold text-center">
          of 100
        </p>
      </div>
      <p className="mt-6 text-white text-3xl font-semibold">Great</p>
      <p className="mt-4 text-gray-300 text-lg">
        You scored higher than 65% of <br />
        the people who have taken <br /> these test.
      </p>
    </div>
  );
}

export default Result;
