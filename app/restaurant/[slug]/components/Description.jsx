import React from "react";

function Description({ description }) {
  return (
    <div className="mt-4">
      <p className="text-lg font-light">{description}</p>
    </div>
  );
}

export default Description;
