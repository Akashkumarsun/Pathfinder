import React, { useState } from "react";
import background from "./assets/bg-main-desktop.png";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";
import Form from "./Form";

function InteractiveCard() {
  // state
  const [cardDetails, setCardDetails] = useState({
    name: "AKASH KUMAR",
    number: "0000 0000 0000 0000",
    month: "00",
    year: "00",
    cvv: "000",
  });

  // on change
  function onChange(event) {
    const { name, value } = event.target;

    setCardDetails((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  // on click
  function onClick() {}

  return (
    <div className="h-screen bg-white flex">
      <div className="relative h-screen  w-1/3">
        <img className="h-screen absolute" src={background} alt="bg" />
        <FrontCard cardDetails={cardDetails} />
        <BackCard cardDetails={cardDetails} />
      </div>
      <Form onClick={onClick} cardDetails={cardDetails} onChange={onChange} />
    </div>
  );
}

export default InteractiveCard;
