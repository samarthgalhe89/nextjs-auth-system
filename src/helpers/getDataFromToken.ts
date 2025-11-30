import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  email?: string;
  username?: string;
  iat: number;
  exp: number;
}

export const getDataFromToken = (request: NextRequest): string => {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      throw new Error("No token found");
    }

    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as DecodedToken;

    return decoded.id;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message || "Invalid or expired token");
  }
};
