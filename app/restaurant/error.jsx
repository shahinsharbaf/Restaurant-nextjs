"use client";

import Image from "next/image";
import errorImg from "../../public/icons/error.png";

function Error({ error }) {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image src={errorImg} className="w-64" />
      <div className="bg-gray-50 shadow-lg p-5 mt-3 rounded">
        <p className="capitalize text-red-500">Error :</p>
        <p className="capitalize mt-2 text-red-600">{error.message}</p>
      </div>
    </div>
  );
}

export default Error;
