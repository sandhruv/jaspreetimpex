import jwt from "jsonwebtoken";
import { connectDB } from "./mongodb";
import User, { IUser } from "./models/User";

const JWT_SECRET = process.env.JWT_SECRET || "jaspreet_impex_jwt_secret_key_2024";

export interface JWTPayload {
  id: string;
}

export function signToken(id: string): string {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "7d",
  } as jwt.SignOptions);
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export async function getUserFromToken(token: string): Promise<IUser | null> {
  const payload = verifyToken(token);
  if (!payload) return null;

  await connectDB();
  const user = await User.findById(payload.id);
  return user;
}
