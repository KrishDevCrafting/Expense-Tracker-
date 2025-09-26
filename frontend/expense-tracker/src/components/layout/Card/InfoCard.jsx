import React from "react";

export const InfoCard = (icon, label, color, value) => {
  return (
    <div className="">
      <div
        className={`w-14 h-14 flex item-center justify-center text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
    </div>
  );
};
