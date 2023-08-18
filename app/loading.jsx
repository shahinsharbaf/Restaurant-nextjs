import React from "react";
import Header from "./components/Header";

function Loading() {
  return (
    <>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
          return (
            <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer bg-gray-300"></div>
          );
        })}
      </div>
    </>
  );
}

export default Loading;
