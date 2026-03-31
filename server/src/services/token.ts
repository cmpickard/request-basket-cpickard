import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) throw new Error("SECRET_KEY is not set in environment");

export function generateToken(endpoint: string) {
  return jwt.sign(endpoint, SECRET_KEY);
}
