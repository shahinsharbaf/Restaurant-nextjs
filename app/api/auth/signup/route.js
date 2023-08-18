import validator from "validator";
import db from "../../../db";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { cookies } from "next/headers";

export async function POST(request) {
  const { firstName, lastName, email, phone, city, password } =
    await request.json();
  const errors = [];
  const pool = await db();
  const [userWithEmail] = await pool.execute(
    `SELECT * FROM user WHERE email="${email}"`
  );
  const validationSchema = [
    {
      valid: validator.isLength(firstName, {
        min: 1,
        max: 20,
      }),
      errorMessage: "First name is invalid",
    },
    {
      valid: validator.isLength(lastName, {
        min: 1,
        max: 20,
      }),
      errorMessage: "Last name is invalid",
    },
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid",
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: "Phone number is invalid",
    },
    {
      valid: validator.isLength(city, {
        min: 1,
        max: 20,
      }),
      errorMessage: "City is Invalid",
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: "Password is not strong",
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
  if (userWithEmail.length) {
    return new Response("Email is already exist", { status: 400 });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const [] = await pool.execute(
    `INSERT INTO user(first_name,last_name,city,password,email,phone) VALUES ("${firstName}","${lastName}","${city}","${hashPassword}","${email}","${phone}")`
  );
  pool.end();
  const alg = "HS256";
  const secret = new TextEncoder().encode("guhkjljhjnkjnkjhjbhjbhjbknjnjknk");
  const token = await new jose.SignJWT({ email: email })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);
  cookies().set("jwt", token);
  return new Response(
    JSON.stringify({
      name: firstName,
      last: lastName,
      city: city,
      email: email,
      phone: phone,
      // created_at: userWithEmail[0].created_at,
      //  updated_at: userWithEmail[0].created_at,
    })
  );
}
