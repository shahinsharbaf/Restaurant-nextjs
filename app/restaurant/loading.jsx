import React from "react";
import RestaurantNavBar from "./[slug]/components/RestaurantNavBar";
import Header from "./[slug]/components/Header";

function Loading() {
  return (
    <>
      <Header name={""} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-gray-400 w-[70%] rounded p-3 shadow text-black h-80"></div>
        <div className="w-[27%] bg-gray-400 relative text-reg text-black h-72"></div>
      </div>
    </>
  );
}

export default Loading;
