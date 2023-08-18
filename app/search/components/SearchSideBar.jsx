import React from "react";
import Link from "next/link";

function SearchSideBar({ region, cuisine, searchParams }) {
  return (
    <div className="w-1/5 text-black mr-3">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {region.map((item) => {
          return (
            <Link
              href={{
                pathname: "search",
                query: {
                  ...searchParams,
                  city: item.name,
                },
              }}
              className="font-light text-reg"
            >
              {item.name}
            </Link>
          );
        })}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisine.map((item) => {
          return (
            <Link
              href={{
                pathname: "search",
                query: {
                  ...searchParams,
                  cuisine: item.name,
                },
              }}
              className="font-light text-reg"
            >
              {item.name}
            </Link>
          );
        })}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <Link
            href={{
              pathname: "search",
              query: {
                ...searchParams,
                price: "CHEAP",
              },
            }}
            className="border w-full text-reg font-light rounded-l p-2 text-center"
          >
            $
          </Link>
          <Link
            href={{
              pathname: "search",
              query: {
                ...searchParams,
                price: "REGULAR",
              },
            }}
            className="border-r border-t border-b w-full text-reg font-light p-2 text-center"
          >
            $$
          </Link>
          <Link
            href={{
              pathname: "search",
              query: {
                ...searchParams,
                price: "EXPANSIVE",
              },
            }}
            className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r text-center"
          >
            $$$
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchSideBar;
