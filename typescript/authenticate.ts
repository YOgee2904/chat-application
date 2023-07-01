import { readFileSync } from "fs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const privateKey = readFileSync(__dirname+"/secret/private.pem", "utf8");
const publicKey = readFileSync(__dirname+"/secret/public.pem", "utf8");

export function jwtMiddleware(req: Request, res: Response, next: Function) {
  try {
    const token = req.headers.cookie?.split("token=")[1];
    if (!token) {
      return res.redirect("/login");
    }
    const decoded = jwt.verify(token, publicKey);
    if (decoded) {
      return next();
    }
    res.status(401).json("You are not authorized");
  } catch (err) {
    res.json({ error: err });
  }
}

export function generateToken(data: any) {
  const token = jwt.sign(data, privateKey, { algorithm: "RS256" });
  return token;
}
