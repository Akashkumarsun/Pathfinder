import React, { useState } from "react";
import TextField from "./TextField";
import Button from "./Button";

function InputField(props) {
  // state
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // on text field change
  function onChange(event) {
    const { name, value } = event.target;
    const re = /^[0-9\b]+$/;

    if (name === "DAY" && (value === "" || re.test(value))) {
      setDay(value);
    } else if (name === "MONTH" && (value === "" || re.test(value))) {
      setMonth(value);
    } else if (name === "YEAR" && (value === "" || re.test(value))) {
      setYear(value);
    }
  }

  // on submit
  function onSubmit(event) {
    props.calculate(day, month, year);
    setDay("");
    setMonth("");
    setYear("");
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex space-x-6">
          <TextField
            value={day}
            id={"day"}
            name="DAY"
            placeholder={"DD"}
            onChange={onChange}
          />
          <TextField
            value={month}
            id={"month"}
            name="MONTH"
            placeholder={"MM"}
            onChange={onChange}
          />
          <TextField
            value={year}
            id={"year"}
            name="YEAR"
            placeholder={"YYYY"}
            onChange={onChange}
          />
        </div>
        <Button />
      </form>
    </div>
  );
}

export default InputField;
