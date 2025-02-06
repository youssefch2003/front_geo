import React from "react";

const LoadingBar = ({ progress = 45 }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-58 bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default LoadingBar;
