import React from "react";

function Form(props) {
  return (
    <div className="grid place-content-center w-2/3">
      <div>
        <label htmlFor="name" className="tracking-widest text-sm font-semibold">
          CARDHOLDER NAME
        </label>
        <div className="mt-1">
          <input
            onChange={props.onChange}
            className="w-[500px] border p-3 rounded-lg focus:outline-none focus:border-violet-600 focus:ring-violet-600 text-lg font-semibold tracking-wider"
            id="name"
            name="name"
            placeholder="e.g Jane Appleseed"
            value={props.cardDetails.name}
          />
        </div>
      </div>
      <div className="mt-8">
        <label
          htmlFor="number"
          className="tracking-widest text-sm font-semibold"
        >
          CARD NUMBER
        </label>
        <div className="mt-1">
          <input
            onChange={props.onChange}
            className="w-[500px] border p-3 rounded-lg focus:outline-none focus:border-violet-600 focus:ring-violet-600 text-lg font-semibold tracking-wider"
            id="number"
            name="number"
            placeholder="e.g 1234 5678 9123 0000"
            value={props.cardDetails.number}
          />
        </div>
      </div>
      <div className="flex mt-8 space-x-4 items-center">
        <div>
          <label className="tracking-widest text-sm font-semibold">
            EXP. DATE (MM/YY)
          </label>
          <div className="flex space-x-2 mt-1">
            <input
              onChange={props.onChange}
              className="w-[100px] border p-3 rounded-lg focus:outline-none focus:border-violet-600 focus:ring-violet-600 text-lg font-semibold tracking-wider"
              id="month"
              name="month"
              placeholder="MM"
              value={props.cardDetails.month}
            />
            <input
              onChange={props.onChange}
              className="w-[100px] border p-3 rounded-lg focus:outline-none focus:border-violet-600 focus:ring-violet-600 text-lg font-semibold tracking-wider"
              id="year"
              name="year"
              placeholder="YY"
              value={props.cardDetails.year}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="cvv"
            className="tracking-widest text-sm font-semibold"
          >
            CVV
          </label>
          <div className="mt-1">
            <input
              onChange={props.onChange}
              className="w-[240px] border p-3 rounded-lg focus:outline-none focus:border-violet-600 focus:ring-violet-600 text-lg font-semibold tracking-wider"
              id="cvv"
              name="cvv"
              placeholder="e.g. 000"
              value={props.cardDetails.cvv}
            />
          </div>
        </div>
      </div>
      <button
        onClick={props.onClick}
        className="p-4 w-[500px] bg-purple-950 text-white mt-6 rounded-lg text-xl"
      >
        Confirm
      </button>
    </div>
  );
}

export default Form;
