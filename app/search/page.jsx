//components
import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
// const mysql = require("mysql2/promise");
import db from "@/app/db";

const fetchRestaurantByCityCuisinePrice = async (searchParams) => {
  const pool = await db();
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "shahin2",
  //   password: "numlock",
  //   database: "opentable",
  // });
  let where = "";
  if (searchParams.city && searchParams.city != "") {
    where = `WHERE l.name="${searchParams.city}"`;
    if (searchParams.cuisine) {
      where += ` AND r.cuisine_id="${searchParams.cuisine}"`;
    }
    if (searchParams.price && searchParams.price != "") {
      where += ` AND r.price="${searchParams.price}"`;
    }
  } else if (searchParams.cuisine && searchParams.cuisine != "") {
    where = `WHERE r.cuisine_id="${searchParams.cuisine}"`;
    if (searchParams.price) {
      where += ` AND r.price="${searchParams.price}"`;
    }
  } else if (searchParams.price) {
    where = `WHERE r.price="${searchParams.price}"`;
  }
  const [restaurantrows] = await pool.execute(
    `SELECT r.id,r.name,r.main_image,r.price,r.cuisine_id,r.slug FROM restaurant r JOIN location l ON r.location_id=l.id ${where}`
  );
  pool.end();
  return restaurantrows;
};

const fetchRegion = async () => {
  const pool = await db();
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "shahin2",
  //   password: "numlock",
  //   database: "opentable",
  // });
  const [region] = await pool.execute(`SELECT name FROM location`);
  pool.end();
  return region;
};

const fetchCuisine = async () => {
  const pool = await db();
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "shahin2",
  //   password: "numlock",
  //   database: "opentable",
  // });
  const [cuisine] = await pool.execute(`SELECT name FROM cuisine`);
  pool.end();
  return cuisine;
};

async function Search({ searchParams }) {
  const restaurants = await fetchRestaurantByCityCuisinePrice(searchParams);
  const region = await fetchRegion();
  const cuisine = await fetchCuisine();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          region={region}
          cuisine={cuisine}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length ? (
            <RestaurantCard restaurants={restaurants} />
          ) : (
            <h1 className="text-black">
              Sorry, we find no restaurant in this area
            </h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
