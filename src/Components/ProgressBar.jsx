import React from "react";

const ProgressBar = ({ currentIndex, totalQuestions }) => {
  const progressPercentage = Math.round((currentIndex / totalQuestions) * 100);

  return (
    <div className="w-full lg:w-[80%] m-auto bg-[#1f2458] my-3 rounded-lg h-[14px] overflow-hidden">
      <div
        style={{
          width: `${progressPercentage}%`,
          transition: "width 0.5s ease-in-out",
        }}
        className="bg-[#24FEEE] h-full"
      ></div>
    </div>
  );
};

export default ProgressBar;
