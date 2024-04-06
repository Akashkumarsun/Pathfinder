import React, { useState } from "react";
import InputField from "./InputField";
import Result from "./Result";

function AgeCalculator() {
  const [day, setDay] = useState("--");
  const [month, setMonth] = useState("--");
  const [year, setYear] = useState("--");

  // calculate
  function calculate(day, month, year) {
    const currentDate = new Date();
    const birthday = new Date(year, month - 1, day);

    var differenceInMilisecond = currentDate.valueOf() - birthday.valueOf();

    var dateDiff = Math.floor(
      (differenceInMilisecond % 31536000000) / 86400000
    );
    var monthDiff = Math.floor(dateDiff / 30);
    dateDiff = dateDiff % 30;
    var yearDiff = Math.floor(differenceInMilisecond / 31536000000);

    setDay(dateDiff);
    setMonth(monthDiff);
    setYear(yearDiff);
  }

  return (
    <div className="h-screen grid place-content-center bg-gray-300 shadow-md">
      <div className="rounded-t-xl rounded-bl-xl rounded-br-[150px] bg-white p-8">
        <InputField calculate={calculate} />
        <Result day={day} month={month} year={year} />
      </div>
    </div>
  );
}

export default AgeCalculator;
