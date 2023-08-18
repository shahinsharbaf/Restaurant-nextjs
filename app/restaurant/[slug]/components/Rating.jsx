import Stars from "@/app/components/Stars";
import React from "react";

function Rating({ reviews, stars }) {
  let sum;
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars stars={stars} />
        <p className="text-reg ml-3">
          {/* {reviews.map((review) => {
            sum += review.Rating;
          })
          } */}
        </p>
      </div>
      <div>
        <p className="text-reg ml-4">{reviews.length} reviews</p>
      </div>
    </div>
  );
}

export default Rating;
