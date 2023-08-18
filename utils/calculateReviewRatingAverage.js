import db from "../app/db";

async function calculateReviewRatingAverage() {
  const pool = await db();
  const [review] = await pool.execute(
    "SELECT sum(rating) / count(restaurant_id) as rating,restaurant_id FROM opentable.review GROUP BY restaurant_id"
  );
  pool.end();
  return review;
}

export default calculateReviewRatingAverage;
