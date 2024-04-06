import React from "react";

function TextField(props) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="font-bold text-md tracking-[4px] text-gray-500"
      >
        {props.name}
      </label>
      <div className="mt-2">
        <input
          onChange={props.onChange}
          id={props.id}
          value={props.value}
          name={props.name}
          placeholder={props.placeholder}
          className="border focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md p-4 text-3xl w-[140px] font-bold"
        />
      </div>
      {/* <span>Must be a valid day</span> */}
    </div>
  );
}

export default TextField;
