import * as jose from "jose";
import jwt from "jsonwebtoken";
import db from "../../../db";

export async function POST(request) {
  const { customjwt } = await request.json();
  const bearerToken = `bearer ${customjwt}`;
  if (!bearerToken) {
    return new Response("Unauthorized request(no bearer)", { status: 401 });
  }
  const token = bearerToken.split(" ")[1];
  if (!token) {
    return new Response("Unauthorized request (no token)", { status: 401 });
  }
  const secret = new TextEncoder().encode("guhkjljhjnkjnkjhjbhjbhjbknjnjknk");
  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return new Response("Unauthorized request (token invalid)", {
      status: 401,
    });
  }
  const payload = jwt.decode(token);

  if (!payload.email) {
    return new Response("Unauthorized request (crushed token)", {
      status: 401,
    });
  }

  const pool = await db();
  const [user] = await pool.execute(
    `SELECT id,first_name,last_name,city,email,phone,created_at,updated_at FROM user WHERE email="${payload.email}"`
  );
  pool.end();
  return new Response(
    JSON.stringify({
      name: user[0].first_name,
      last: user[0].last_name,
      city: user[0].city,
      email: user[0].email,
      phone: user[0].phone,
      created_at: user[0].created_at,
      updated_at: user[0].updated_at,
    })
  );
}
