import React from "react";
import ReviewCard from "./ReviewCard";

function Reviews({ reviews }) {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
        What {reviews.length} {reviews.length > 1 ? "people" : "person"} are
        saying
      </h1>
      <div>
        <ReviewCard reviews={reviews} />
      </div>
    </div>
  );
}

export default Reviews;
