// const mysql = require("mysql2/promise");

// export const connection = await mysql.createConnection({
//   host: "localhost",
//   user: "shahin2",
//   password: "numlock",
//   database: "opentable",
// });
async function db() {
  const mysql = require("mysql2/promise");

  const config = {
    host: "localhost",
    user: "shahin2",
    password: "numlock",
    database: "opentable",
  };

  const pool = mysql.createPool(config);
  return pool;
}

export default db;
