import Link from "next/link";
import React from "react";
import Price from "./Price";
import Stars from "./Stars";

async function RestaurantCard({ restaurant, review, stars }) {
  let reviewCount = 0;
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href={`/restaurant/${restaurant.slug}`}>
        <img src={restaurant.main_image} alt="" className="w-full h-36" />
        <div className="p-1 text-black">
          <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            <Stars stars={stars} />
            {review.map((item) => {
              if (item.restaurant_id === restaurant.id) {
                reviewCount++;
              }
            })}
            <p className="ml-2">
              {reviewCount} review{reviewCount > 1 ? "s" : null}
            </p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{restaurant.cuisine_id}</p>
            <Price restaurantPrice={restaurant.price} />
            <p>{restaurant.location_id}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
}

export default RestaurantCard;
