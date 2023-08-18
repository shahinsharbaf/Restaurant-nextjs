import React from "react";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import calculateReviewRatingAverage from "@/utils/calculateReviewRatingAverage";
// const mysql = require("mysql2/promise");
import db from "@/app/db";

const fetchRestaurantBySlug = async (slug) => {
  const pool = await db();
  const [restaurant] = await pool.execute(
    `SELECT id,name,images,description,slug FROM restaurant WHERE slug="${slug}"`
  );
  if (restaurant.length === 0) {
    throw new Error("cant find restaurant");
  }
  pool.end();
  return restaurant[0];
};

const fetchReviwByRestaurant = async (id) => {
  const pool = await db();
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "shahin2",
  //   password: "numlock",
  //   database: "opentable",
  // });
  const [reviws] = await pool.execute(
    `SELECT * FROM review WHERE restaurant_id=${id}`
  );
  if (!reviws) {
    throw new Error();
  }
  pool.end();
  return reviws;
};

function findRestaurantRating(id, rating) {
  const item = rating.find((element) => element.restaurant_id === id);
  return item && item.restaurant_id === id ? item.rating : "";
}

async function RestaurantDetails({ params }) {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  const reviews = await fetchReviwByRestaurant(restaurant.id);
  const allReview = await calculateReviewRatingAverage();
  const stars = findRestaurantRating(restaurant.id, allReview);
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow text-black">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={reviews} stars={stars} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={reviews} />
      </div>
      <div className="w-[27%] relative text-reg text-black">
        <ReservationCard />
      </div>
    </>
  );
}

export default RestaurantDetails;
