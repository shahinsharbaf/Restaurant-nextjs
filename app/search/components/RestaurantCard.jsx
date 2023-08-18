import Price from "@/app/components/Price";
import calculateReviewRatingAverage from "@/utils/calculateReviewRatingAverage";
import Link from "next/link";
import React from "react";

async function RestaurantCard({ restaurants }) {
  const review = await calculateReviewRatingAverage();
  return (
    <>
      {restaurants.map((restaurant) => {
        return (
          <div className="border-b flex pb-5">
            <img src={restaurant.main_image} alt="" className="w-48 rounded" />
            <div className="pl-5 text-black">
              <h2 className="text-3xl">{restaurant.name}</h2>
              <div className="flex items-start">
                <div className="flex mb-2">*****</div>
                <p className="ml-2 text-sm">
                  {review.map((item) => {
                    if (item.restaurant_id === restaurant.id) {
                      if (item.rating > 4) return "Awesome";
                      if (item.rating >= 3 && item.rating < 4) return "Good";
                      if (item.rating >= 2 && item.rating < 3) return "Average";
                      return "no rating";
                    }
                  })}
                </p>
              </div>
              <div className="mb-9">
                <div className="font-light flex text-reg">
                  <Price restaurantPrice={restaurant.price} />
                  <p className="mr-4">{restaurant.cuisine_id}</p>
                  {/* <p className="mr-4">Ottawa</p> */}
                </div>
              </div>
              <div className="text-red-600">
                <Link href={`/restaurant/${restaurant.slug}`}>
                  View more information
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default RestaurantCard;
