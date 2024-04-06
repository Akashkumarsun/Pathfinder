import React from "react";
import cardFront from "./assets/bg-card-front.png";

function FrontCard(props) {
  return (
    <div className="absolute left-80 top-1/4">
      <div className="w-[500px] relative">
        <img className="w-[500px] absolute" src={cardFront} alt="card-front" />
        <div className="absolute">
          <div>
            <div className="flex items-center space-x-4 p-10">
              <div className="rounded-full bg-white h-14 w-14"></div>
              <div className="rounded-full border border-white h-8 w-8"></div>
            </div>
            <div className="px-10 pt-8 mt-3 text-3xl text-white tracking-widest">
              {props.cardDetails.number}
            </div>
            <div className="flex px-10 pt-4 justify-between w-[500px] text-white text-md tracking-widest">
              <div>{props.cardDetails.name}</div>
              <div>
                {props.cardDetails.month}/{props.cardDetails.year}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontCard;
