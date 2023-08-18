import React from "react";

function Price({ restaurantPrice }) {
  if (restaurantPrice === "CHEAP") {
    return (
      <p className="mr-3 text-black">
        $$<span className="text-gray-400">$$</span>
      </p>
    );
  } else if (restaurantPrice === "REGULAR") {
    return (
      <p className="mr-3 text-black">
        $$$<span className="text-gray-400">$</span>
      </p>
    );
  } else {
    return (
      <p className="mr-3 text-black">
        $$$$<span className="text-gray-400"></span>
      </p>
    );
  }
}

export default Price;
