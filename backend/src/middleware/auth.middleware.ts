import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { env } from "node:process";

// userRequest
export interface UserRequest extends Request {
  user?: any; // Define the user property to hold decoded JWT data
}
// to use jwt
// middleware to check if the user is authenticated
export const authMiddleware = (req: UserRequest, res: Response, next: NextFunction) => {
  // get the token from the request headers
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    if (!env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is not configured." });
    }
    const decoded = jwt.verify(token, env.JWT_SECRET as string);
    req.user = decoded; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};
