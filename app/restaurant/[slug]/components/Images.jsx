import React from "react";

function Images({ images }) {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
        {images ? images.split(",").length : "No"} photo
        {images && images.split(",").length > 1 ? "s" : ""}
      </h1>
      <div className="flex flex-wrap">
        {images &&
          images
            .split(",")
            .map((image, index) => (
              <img
                className="w-56 h-44 mr-1 mb-1"
                src={image}
                alt=""
                key={index}
              />
            ))}
      </div>
    </div>
  );
}

export default Images;
