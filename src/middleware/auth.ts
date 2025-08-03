import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import userSchema from "../models/userSchema";

// Define a type that extends Request and includes user
interface AuthRequest extends Request {
  user?: {
    id: string;
    isAdmin: boolean;
  };
}

const Authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get token from cookie or header
    const token = req.cookies?.token || req.header("x-auth-token");

    if (!token) {
      res.status(401).json({ message: "No token, authorization denied" });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    const user = await userSchema.findById(decoded.id).select("-password");

    if (!user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    req.user = { id: user.id, isAdmin: user.isAdmin }; // ✅ Now properly typed
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const AuthorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user?.isAdmin) {
    res.status(403).json({ message: "Access denied. Admins only." });
    return;
  }
  next();
};

const AuthorizeUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.id !== req.params.id) {
    res.status(403).json({ message: "Access denied." });
    return;
  }
  next();
};

export { Authenticate, AuthorizeAdmin, AuthorizeUser };
