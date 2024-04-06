import React from "react";

function Button() {
  return (
    <div className="flex items-center mt-4">
      <div className="h-[0.5px] w-[450px] bg-slate-200"></div>
      <button className="bg-purple-600 px-4 py-2 rounded-full text-2xl text-center text-white">
        Calculate
      </button>
    </div>
  );
}

export default Button;
