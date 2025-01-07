import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "BlogAppJWTSecret";
const JWT_SECRET = process.env.JWT_SECRET || "BlogAppJWTSecret";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
