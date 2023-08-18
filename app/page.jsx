//components
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
// import calculateReviewRatingAverage from "../utils/calculateReviewRatingAverage";
// const mysql = require("mysql2/promise");
import db from "./db";

function findRestaurantRating(id, rating) {
  const item = rating.find((element) => element.restaurant_id === id);
  return item && item.restaurant_id === id ? item.rating : "";
}
export default async function Home() {
  const pool = await db();
  let stars = 0;
  // const rating = await calculateReviewRatingAverage();
  const [restaurantrows] = await pool.execute(
    "SELECT id,name,main_image,slug,cuisine_id,location_id,price FROM restaurant"
  );
  const [review] = await pool.execute("SELECT restaurant_id FROM review");
  pool.end();
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurantrows.map((restaurant) => (
          // (stars = findRestaurantRating(restaurant.id, rating)),
          <RestaurantCard
            restaurant={restaurant}
            key={restaurant.id}
            review={review}
            stars={stars}
          />
        ))}
      </div>
    </main>
  );
}
