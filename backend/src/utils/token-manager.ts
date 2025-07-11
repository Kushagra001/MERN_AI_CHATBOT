import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  // @ts-ignore - JWT types are not properly handling the secret type
  const token = jwt.sign(payload, secret, {
    expiresIn,
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }
  return new Promise<void>((resolve, reject) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      reject(new Error("JWT_SECRET is not defined"));
      return res.status(500).json({ message: "Server configuration error" });
    }
    // @ts-ignore - JWT types are not properly handling the secret type
    return jwt.verify(token, secret, (err: jwt.VerifyErrors | null, success: any) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};
