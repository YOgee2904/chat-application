import { readFileSync } from "fs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import path from "path";
import { userCollection as users } from "../model/model";
const privateKey = readFileSync(
  path.join(__dirname, "../secret/private.pem"),
  "utf8"
);
const publicKey = readFileSync(
  path.join(__dirname, "../secret/public.pem"),
  "utf8"
);

export function jwtMiddleware(req: Request, res: Response, next: Function) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json("You are not authenticated");
    }
    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) return res.redirect("/refresh-token");
      req.user = decoded;
      next();
    });
  } catch (err) {
    res.json({ error: err });
  }
}
//refresh token

export  function refreshToken(req: Request, res: Response) {
  const { ref_tk } = req.cookies;
  if (!ref_tk)
    return res.status(401).json({ error: "You are not authenticated" });
  try {
     jwt.verify(ref_tk, publicKey, async (err: any, decoded: any) => {
      if (err)
        return res.status(401).json({ error: "You are not authenticated" });
      const user = await users.findOne({ email: decoded.email });
      const token = generateToken({ email: user?.email,name: user?.name });
      res.status(201).json({token})
    });
  } catch (error) {}
}

export function generateToken(data: any) {
  const token = jwt.sign(data, privateKey, {
    algorithm: "RS256",
    expiresIn: "30m",
  });
  return token;
}

export function generateRefreshToken(data: any) {
  const token = jwt.sign(data, privateKey, {
    algorithm: "RS256",
    expiresIn: "7d",
  });
  return token;
}


export function jwtVerify(token: string) {
  try {
    jwt.verify(token, publicKey, (err: any, decoded: any) => {
      if (err) return false;
      return true;
    });
  } catch (error) {
    return false;
  }
}