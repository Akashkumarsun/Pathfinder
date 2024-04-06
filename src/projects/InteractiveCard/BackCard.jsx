import React from "react";
import cardBack from "./assets/bg-card-back.png";

function BackCard(props) {
  return (
    <div className="absolute top-2/4 left-2/4">
      <div className="w-[500px] relative">
        <img className="w-[500px] absolute" src={cardBack} alt="card-front" />
        <div className="absolute top-[120px] right-[60px] text-md text-white tracking-widest">
          {props.cardDetails.cvv}
        </div>
      </div>
    </div>
  );
}

export default BackCard;
