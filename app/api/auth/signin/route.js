import validator from "validator";
import db from "../../../db";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { cookies } from "next/headers";

export async function POST(request) {
  const { email, password } = await request.json();
  const errors = [];
  const pool = await db();

  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid",
    },
    {
      valid: validator.isLength(password, {
        min: 1,
      }),
      errorMessage: "Password is required",
    },
  ];
  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });
  if (errors.length) {
    return new Response(errors[0], { status: 400 });
  }
  const [userWithEmail] = await pool.execute(
    `SELECT * FROM user WHERE email="${email}"`
  );
  pool.end();
  if (userWithEmail.length === 0) {
    return new Response("Email or password is invalid(email not exist)", {
      status: 401,
    });
  }
  const isMatch = await bcrypt.compare(password, userWithEmail[0].password);
  if (!isMatch) {
    return new Response("Email or password is invalid(password is incorect)", {
      status: 401,
    });
  }
  const alg = "HS256";
  const secret = new TextEncoder().encode("guhkjljhjnkjnkjhjbhjbhjbknjnjknk");
  const token = await new jose.SignJWT({ email: email })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);
  // setCookie("jwt", token, { req, res });
  cookies().set("jwt", token);
  // localStorage.setItem("jwt", token);
  return new Response(
    JSON.stringify({
      name: userWithEmail[0].first_name,
      last: userWithEmail[0].last_name,
      city: userWithEmail[0].city,
      email: userWithEmail[0].email,
      phone: userWithEmail[0].phone,
      created_at: userWithEmail[0].created_at,
      updated_at: userWithEmail[0].created_at,
    })
  );
}
