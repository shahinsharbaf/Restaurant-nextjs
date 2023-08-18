"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

function SearchBar() {
  const [location, setLocation] = useState("");
  const router = useRouter();
  const handelSearch = () => {
    router.push(`/search?city=${location}`);
  };
  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center text-black">
      <input
        className="rounded  mr-3 p-2 w-[450px]"
        type="text"
        placeholder="State, city or town"
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
      <button
        className="rounded bg-red-600 px-9 py-2 text-white"
        onClick={() => {
          handelSearch();
        }}
      >
        Let's go
      </button>
    </div>
  );
}

export default SearchBar;
