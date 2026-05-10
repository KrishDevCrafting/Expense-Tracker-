import React from "react";

export const InfoCard = ({ icon, label, value, color }) => {
  return (
    <>
      <div className="flex gap-6 bg-white dark:bg-[#1e1e2f] p-6 rounded-2xl shadow-md shadow-gray-100 dark:shadow-none border border-gray-200 dark:border-white/10">
        <div
          className={`w-14 h-14 flex items-center justify-center text-white ${color} rounded-full drop-shadow-xl`}
        >
          {icon}
        </div>

        <div>
          <h6
            className="
          text-sm text-gray-500 dark:text-gray-400 mb-1
          "
          >
            {label}
          </h6>

          <span
            className="
          text-[22px] dark:text-white
          "
          >
            ${value}
          </span>
        </div>
      </div>
    </>
  );
};
