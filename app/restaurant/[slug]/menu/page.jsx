import React from "react";
import RestaurantNavBar from "../components/RestaurantNavBar";
import Menu from "../components/Menu";
// const mysql = require("mysql2/promise");
import db from "../../../db";

async function RestaurantMenu({ params }) {
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "shahin2",
  //   password: "numlock",
  //   database: "opentable",
  // });
  const pool = await db();
  const [restaurantrows] = await pool.execute(
    `SELECT i.name,i.price,i.description,i.created_at,i.updated_at,i.restaurant_id FROM restaurant r JOIN item i ON r.id=i.restaurant_id WHERE r.slug="${params.slug}"`
  );
  if (!restaurantrows) {
    throw new Error();
  }
  pool.end();
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow text-black">
        <RestaurantNavBar slug={params.slug} />
        <Menu menu={restaurantrows} />
      </div>
    </>
  );
}

export default RestaurantMenu;
