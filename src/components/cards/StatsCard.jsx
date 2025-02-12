import React from "react";
import { CircleCheck, CircleX, Clock9, Loader } from "lucide-react"; // Import icons

const StatsCard = ({ title, value, indicator, type, icon }) => {
  const cardColors = {
    primary: "bg-blue-500",
    success: "bg-green-500",
    danger: "bg-red-500",
    warning: "bg-yellow-500 text-black",
    dark: "bg-gray-800 text-black",
    attente: "bg-pink-400 text-black",
    ser: "bg-sky-200 text-black",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-40 h-40 rounded-2xl shadow-lg ${cardColors[type]} text-white transition-transform transform hover:scale-105`}
    >
      {icon && <div className="mb-2">{icon}</div>} {/* Render icon properly */}
      <h2 className="text-2xl font-bold">{value}</h2>
      <small className={indicator >= 0 ? "text-green-300" : "text-red-300"}>
        {/* {indicator}% */}
      </small>
      <span className="text-sm text-center">{title}</span>
    </div>
  );
};
export default StatsCard

